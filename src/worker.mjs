// Generated shape matches @workersphp/cli. PHP runs in the Worker.
// D1 (SQLite) is the database. The app zip is a static asset, not this file.
import { createLaravelWorker } from '@workersphp/laravel';
import { createCacheHubClass } from '@workersphp/runtime/src/CacheHub.mjs';
import loader from '@workersphp/php-wasm-jspi/php8.5-web.mjs';
import wasm from '@workersphp/php-wasm-jspi/php8.5-web.mjs.wasm';

export const CacheHub = createCacheHubClass();

export default createLaravelWorker({
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
});
