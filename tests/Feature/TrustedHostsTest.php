<?php

namespace Tests\Feature;

use App\Http\Middleware\TrustProductionHosts;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TrustedHostsTest extends TestCase
{
    use RefreshDatabase;

    public function test_production_trusts_the_vercel_deployment_host(): void
    {
        $this->app['env'] = 'production';
        config(['app.url' => 'http://localhost']);
        $_ENV['VERCEL_URL'] = 'wedding-invitation-abc.vercel.app';
        $_SERVER['VERCEL_URL'] = 'wedding-invitation-abc.vercel.app';
        putenv('VERCEL_URL=wedding-invitation-abc.vercel.app');

        try {
            $patterns = (new TrustProductionHosts($this->app))->hosts();
        } finally {
            putenv('VERCEL_URL');
            unset($_ENV['VERCEL_URL'], $_SERVER['VERCEL_URL']);
        }

        $this->assertContains('^(.+\.)?'.preg_quote('localhost').'$', $patterns);
        $this->assertContains('^'.preg_quote('wedding-invitation-abc.vercel.app').'$', $patterns);
    }
}
