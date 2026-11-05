<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustHosts as Middleware;

class TrustProductionHosts extends Middleware
{
    /**
     * @return array<int, string|null>
     */
    public function hosts(): array
    {
        if (! $this->app->isProduction()) {
            return ['.*'];
        }

        $hosts = [$this->allSubdomainsOfApplicationUrl()];

        foreach (['VERCEL_URL', 'VERCEL_BRANCH_URL', 'VERCEL_PROJECT_PRODUCTION_URL'] as $variable) {
            $hosts[] = $this->patternForHost($this->environmentValue($variable));
        }

        return array_values(array_filter($hosts));
    }

    private function patternForHost(?string $host): ?string
    {
        if ($host === null) {
            return null;
        }

        $host = strtolower(trim($host));
        $host = preg_replace('#^https?://#', '', $host) ?? $host;
        $host = explode('/', $host, 2)[0];
        $host = explode(':', $host, 2)[0];

        if ($host === '' || preg_match('/^[a-z0-9.-]+$/', $host) !== 1) {
            return null;
        }

        return '^'.preg_quote($host).'$';
    }

    private function environmentValue(string $name): ?string
    {
        $value = $_ENV[$name] ?? $_SERVER[$name] ?? getenv($name);

        return is_string($value) && $value !== '' ? $value : null;
    }
}
