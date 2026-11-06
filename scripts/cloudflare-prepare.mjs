// Packs this Laravel app for Cloudflare Workers and creates the D1 database.
// Local `php artisan serve` keeps using database/database.sqlite.
import { spawnSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import {
    chmodSync,
    cpSync,
    existsSync,
    mkdtempSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';

const root = process.cwd();
const workerName = 'stephen-raenah-wedding';
const databaseName = 'stephen-raenah-wedding';
const staging = join(root, '.workersphp');
const shell = process.platform === 'win32';
const ciOnly = process.argv.includes('--ci');
const skipVite = process.argv.includes('--skip-vite');
let hotFile = null;
let packed = false;

// Cloudflare runs `npm run build` before `npx wrangler deploy`. Local builds stay Vite-only.
if (ciOnly && process.env.WORKERS_CI !== '1') {
    process.exit(0);
}

const run = (command, args, options = {}) => {
    const result = spawnSync(command, args, {
        cwd: root,
        stdio: 'inherit',
        shell,
        ...options,
    });

    if (result.status !== 0) {
        throw new Error(`${command} ${args.join(' ')} exited ${result.status ?? 1}`);
    }
};

const capture = (command, args, options = {}) =>
    spawnSync(command, args, {
        cwd: root,
        encoding: 'utf8',
        shell,
        ...options,
    });

const hasCommand = (command) => capture(command, ['--version']).status === 0;

const toolsBin = join(tmpdir(), 'wedding-cloudflare-tools', 'bin');
const phpArchiveUrl = 'https://dl.static-php.dev/static-php-cli/common/php-8.4.23-cli-linux-x86_64.tar.gz';

const findNamedFile = (directory, name) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);

        if (entry.isDirectory()) {
            const found = findNamedFile(path, name);

            if (found) {
                return found;
            }
        } else if (entry.name === name) {
            return path;
        }
    }

    return null;
};

const installUserlandTools = () => {
    mkdirSync(toolsBin, { recursive: true });

    if (!hasCommand('php')) {
        console.error('Downloading PHP...');
        const archive = join(tmpdir(), 'wedding-cloudflare-php.tar.gz');
        const extracted = join(tmpdir(), 'wedding-cloudflare-php');
        run('curl', ['-fsSL', '-o', archive, phpArchiveUrl]);
        rmSync(extracted, { recursive: true, force: true });
        mkdirSync(extracted, { recursive: true });
        run('tar', ['-xzf', archive, '-C', extracted]);
        const binary = findNamedFile(extracted, 'php');

        if (!binary) {
            throw new Error('The PHP archive did not contain a php binary.');
        }

        cpSync(binary, join(toolsBin, 'php'));
        chmodSync(join(toolsBin, 'php'), 0o755);
    }

    if (!hasCommand('composer')) {
        console.error('Downloading Composer...');
        run('curl', [
            '-fsSL',
            '-o',
            join(toolsBin, 'composer.phar'),
            'https://getcomposer.org/download/latest-stable/composer.phar',
        ]);
        writeFileSync(
            join(toolsBin, 'composer'),
            '#!/bin/sh\nexec php "$(dirname "$0")/composer.phar" "$@"\n',
        );
        chmodSync(join(toolsBin, 'composer'), 0o755);
    }

    // The image's zip keeps nested node_modules files, which blows past the 25 MB asset limit.
    cpSync(join(root, 'scripts', 'zip-shim.py'), join(toolsBin, 'zip'));
    chmodSync(join(toolsBin, 'zip'), 0o755);
    process.env.PATH = `${toolsBin}${delimiter}${process.env.PATH ?? ''}`;
};

const ensureBuildTools = () => {
    const missing = ['php', 'composer', 'zip'].filter((command) => !hasCommand(command));

    if (process.platform === 'win32') {
        if (missing.length > 0) {
            throw new Error(`Install ${missing.join(', ')} before packing the app for Cloudflare.`);
        }
    } else {
        installUserlandTools();
    }

    const sqlite = capture('php', ['-r', 'exit(extension_loaded("pdo_sqlite") ? 0 : 1);']);

    if (sqlite.status !== 0) {
        throw new Error('PHP is installed without pdo_sqlite, which the D1 schema build needs.');
    }
};

const appKey = () => {
    if (process.env.APP_KEY && process.env.APP_KEY.startsWith('base64:')) {
        return process.env.APP_KEY;
    }

    if (!existsSync(join(root, '.env'))) {
        return null;
    }

    const match = readFileSync(join(root, '.env'), 'utf8').match(/^APP_KEY=(.+)$/m);

    if (!match) {
        return null;
    }

    const value = match[1].trim().replace(/^["']|["']$/g, '');

    return value.startsWith('base64:') ? value : null;
};

const uploadAppKey = (key) => {
    if (!key) {
        return;
    }

    const listed = capture('npx', ['wrangler', 'secret', 'list']);

    if (listed.status !== 0 || listed.stdout.includes('APP_KEY')) {
        return;
    }

    const uploaded = capture('npx', ['wrangler', 'secret', 'put', 'APP_KEY'], {
        input: key,
    });

    if (uploaded.status !== 0) {
        console.error('APP_KEY will be created with the Worker. An existing local key was not uploaded.');
    }
};

const copyAssets = () => {
    rmSync(join(root, 'assets'), { recursive: true, force: true });
    mkdirSync(join(root, 'assets'), { recursive: true });
    cpSync(join(staging, 'assets'), join(root, 'assets'), { recursive: true });
    writeFileSync(join(root, 'assets', '.gitkeep'), '');
};

const rememberDatabaseId = () => {
    const generated = JSON.parse(readFileSync(join(staging, 'wrangler.jsonc'), 'utf8'));
    const databaseId = generated.d1_databases?.[0]?.database_id;

    if (!databaseId || databaseId.startsWith('00000000')) {
        throw new Error('Cloudflare did not return a D1 database id.');
    }

    writeFileSync(
        join(root, 'wrangler.jsonc'),
        JSON.stringify(
            {
                $schema: './node_modules/wrangler/config-schema.json',
                name: workerName,
                main: 'src/worker.mjs',
                compatibility_date: '2026-11-04',
                observability: { enabled: true },
                assets: {
                    directory: './assets',
                    binding: 'ASSETS',
                    run_worker_first: true,
                },
                vars: {
                    APP_URL: 'https://stephen-raenah-wedding.josefernandodc-dev.workers.dev',
                },
                d1_databases: generated.d1_databases,
                durable_objects: generated.durable_objects,
                migrations: generated.migrations,
            },
            null,
            4,
        ) + '\n',
    );
};

const remoteMigrations = () => {
    const result = capture('npx', [
        'wrangler',
        'd1',
        'execute',
        databaseName,
        '--remote',
        '--json',
        '--command',
        'SELECT migration FROM migrations',
    ]);

    if (result.status !== 0) {
        return [];
    }

    try {
        const parsed = JSON.parse(result.stdout);
        const rows = parsed[0]?.results ?? [];

        return rows.map((row) => row.migration).filter(Boolean);
    } catch {
        return [];
    }
};

const migrationNames = () =>
    readdirSync(join(root, 'database', 'migrations'))
        .filter((name) => name.endsWith('.php'))
        .map((name) => name.replace(/\.php$/, ''))
        .filter((name) => /^[A-Za-z0-9_]+$/.test(name))
        .sort();

const schemaSql = () => {
    const directory = mkdtempSync(join(tmpdir(), 'wedding-d1-'));
    const database = join(directory, 'schema.sqlite');
    const sqlPath = join(directory, 'schema.sql');
    const dumper = join(directory, 'dump.php');
    writeFileSync(database, '');
    writeFileSync(
        dumper,
        `<?php
$pdo = new PDO('sqlite:' . $argv[1]);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
$rows = $pdo->query("SELECT type, name, sql FROM sqlite_master WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%' AND type IN ('table', 'index')")->fetchAll(PDO::FETCH_ASSOC);
usort($rows, function ($left, $right) {
    return ($left['type'] === 'table' ? 0 : 1) <=> ($right['type'] === 'table' ? 0 : 1);
});
$sql = array_map(fn ($row) => rtrim($row['sql'], "; \\n\\r\\t") . ';', $rows);
$tables = array_values(array_map(
    fn ($row) => $row['name'],
    array_filter($rows, fn ($row) => $row['type'] === 'table'),
));
foreach ($tables as $table) {
    if (!preg_match('/^[A-Za-z0-9_]+$/', $table)) {
        fwrite(STDERR, "Unexpected table name.\\n");
        exit(1);
    }
    $statement = $pdo->query('SELECT * FROM "' . $table . '"');
    foreach ($statement as $record) {
        $columns = [];
        $values = [];
        foreach ($record as $column => $value) {
            if (!preg_match('/^[A-Za-z0-9_]+$/', (string) $column)) {
                fwrite(STDERR, "Unexpected column name.\\n");
                exit(1);
            }
            $columns[] = '"' . $column . '"';
            $values[] = $value === null ? 'NULL' : $pdo->quote((string) $value);
        }
        $sql[] = 'INSERT INTO "' . $table . '" (' . implode(', ', $columns) . ') VALUES (' . implode(', ', $values) . ');';
    }
}
file_put_contents($argv[2], implode("\\n", $sql) . "\\n");
`,
    );

    const migrated = spawnSync('php', ['artisan', 'migrate', '--force', '--no-interaction'], {
        cwd: root,
        stdio: 'inherit',
        shell,
        env: {
            ...process.env,
            APP_ENV: 'local',
            APP_KEY: 'base64:' + randomBytes(32).toString('base64'),
            DB_CONNECTION: 'sqlite',
            DB_DATABASE: database,
            SESSION_DRIVER: 'array',
            CACHE_STORE: 'array',
            QUEUE_CONNECTION: 'sync',
            LOG_CHANNEL: 'stderr',
        },
    });

    if (migrated.status !== 0) {
        throw new Error('Could not build the SQLite schema for D1.');
    }

    const dumped = spawnSync('php', [dumper, database, sqlPath], {
        cwd: root,
        encoding: 'utf8',
    });

    if (dumped.status !== 0) {
        throw new Error(dumped.stderr || 'Could not read the SQLite schema.');
    }

    return sqlPath;
};

const applySchema = () => {
    const names = migrationNames();
    const applied = remoteMigrations();

    if (applied.length === 0) {
        console.error('Applying the SQLite schema to D1...');
        run('npx', [
            'wrangler',
            'd1',
            'execute',
            databaseName,
            '--remote',
            '--file',
            schemaSql(),
        ]);

        return;
    }

    const missing = names.filter((name) => !applied.includes(name));

    if (missing.length > 0) {
        throw new Error(
            `D1 is missing ${missing.length} Laravel migration(s). Apply those tables before deploying again.`,
        );
    }
};

const restoreDevDependencies = () => {
    if (process.env.WORKERS_CI === '1') {
        return;
    }

    console.error('Restoring local PHP dev dependencies...');
    const restored = spawnSync('composer', ['install', '--no-interaction', '--no-progress'], {
        cwd: root,
        stdio: 'inherit',
        shell,
    });

    if (restored.status !== 0) {
        throw new Error('composer install failed while restoring dev dependencies.');
    }
};

try {
    ensureBuildTools();

    if (existsSync(join(root, 'public', 'hot'))) {
        hotFile = readFileSync(join(root, 'public', 'hot'));
        rmSync(join(root, 'public', 'hot'));
    }

    if (!existsSync(join(root, '.env'))) {
        const key = 'base64:' + randomBytes(32).toString('base64');
        const example = existsSync(join(root, '.env.example'))
            ? readFileSync(join(root, '.env.example'), 'utf8')
            : '';
        const envFile = /^APP_KEY=.*$/m.test(example)
            ? example.replace(/^APP_KEY=.*$/m, `APP_KEY=${key}`)
            : `APP_KEY=${key}\n${example}`;
        writeFileSync(join(root, '.env'), envFile);
    }

    if (!skipVite) {
        run('npx', ['vp', 'build']);
    }

    rmSync(staging, { recursive: true, force: true });
    uploadAppKey(appKey());
    packed = true;
    run('npx', [
        'workersphp',
        'deploy',
        '--app',
        '.',
        '--name',
        workerName,
        '--d1',
        databaseName,
        '--out',
        staging,
        '--no-deploy',
        '--env',
        'APP_TIMEZONE=Asia/Manila',
    ]);
    copyAssets();
    rememberDatabaseId();
    applySchema();
} finally {
    if (hotFile !== null) {
        writeFileSync(join(root, 'public', 'hot'), hotFile);
    }

    if (packed) {
        restoreDevDependencies();
    }
}
