// Generated shape matches @workersphp/cli. PHP runs in the Worker.
// D1 (SQLite) is the database. The app zip is a static asset, not this file.
import { createLaravelWorker } from '@workersphp/laravel';
import { createCacheHubClass } from '@workersphp/runtime/src/CacheHub.mjs';
import loader from '@workersphp/php-wasm-jspi/php8.5-web.mjs';
import wasm from '@workersphp/php-wasm-jspi/php8.5-web.mjs.wasm';

export const CacheHub = createCacheHubClass();

const laravel = createLaravelWorker({
    loader,
    wasm,
    envVars: (env) => ({
        APP_NAME: 'S&R Wedding Invitation',
        APP_TIMEZONE: 'Asia/Manila',
        APP_URL: env.APP_URL,
        DB_CONNECTION: 'cfd1',
        D1_BINDING: 'DB',
        SESSION_SECURE_COOKIE: 'true',
        TRUSTED_PROXIES: '*',
    }),
    phpBindings: (env) => ({ cfd1: { DB: env.DB } }),
    configOverrides: () => ({
        'database.default': 'cfd1',
        'app.timezone': 'Asia/Manila',
        'cache.limiter': 'do',
    }),
    cacheHubBinding: 'CACHE_HUB',
    ini: `
        opcache.max_accelerated_files=4096
        memory_limit=96M
    `,
});

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        if (url.pathname === '/_cf/health') {
            return Response.json({
                worker: 'stephen-raenah-wedding',
                runtime: '@workersphp/php-wasm-jspi',
                php: '8.5.2',
            });
        }

        return laravel.fetch(request, env, ctx);
    },
    queue: (batch, env, ctx) => laravel.queue(batch, env, ctx),
    scheduled: (event, env, ctx) => laravel.scheduled(event, env, ctx),
};
