<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // The Cloudflare runtime reads this binding. A cached config disables env(),
        // so the name is fixed here instead of being read from the environment.
        if (config('database.connections.cfd1.database') === null) {
            config([
                'database.connections.cfd1.driver' => 'cfd1',
                'database.connections.cfd1.database' => 'DB',
                'database.connections.cfd1.prefix' => '',
            ]);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureRateLimiting();
        $this->configureHttps();
    }

    protected function configureHttps(): void
    {
        if (! $this->app->environment('production')) {
            return;
        }

        URL::forceScheme('https');
    }

    protected function configureRateLimiting(): void
    {
        RateLimiter::for('invitation-codes', function (Request $request) {
            return Limit::perMinute(8)->by($request->ip() ?: 'unknown');
        });
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
