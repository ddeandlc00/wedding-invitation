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

        return [
            $this->allSubdomainsOfApplicationUrl(),
        ];
    }
}
