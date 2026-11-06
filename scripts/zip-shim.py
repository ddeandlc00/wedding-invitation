#!/usr/bin/env python3
"""Info-ZIP-compatible packer for the Workers PHP build image, which has no zip binary."""

import base64
import os
import re
import subprocess
import sys
import zipfile

SKIP_DIR_NAMES = {'.git', 'node_modules', '.tools', '.workersphp'}


def pattern_to_regex(pattern):
    body = ''.join(
        '[^/]*' if char == '*' else '[^/]' if char == '?' else re.escape(char)
        for char in pattern
    )
    return re.compile('^' + body + '$')


def excluded(path, patterns):
    parts = path.split('/')
    prefixes = ['/'.join(parts[:index]) for index in range(1, len(parts) + 1)]

    for prefix in prefixes:
        basename = prefix.split('/')[-1]

        for pattern in patterns:
            regex = pattern_to_regex(pattern)

            if '/' not in pattern and (regex.match(basename) or regex.match(prefix)):
                return True

            if regex.match(prefix):
                return True

    return False


def archive_name(path):
    relative = os.path.relpath(path, os.getcwd()).replace('\\', '/')

    if relative.startswith('./'):
        return relative[2:]

    return relative


def skip_directory(name, relative):
    if name in SKIP_DIR_NAMES:
        return True

    if relative == 'vendor' or relative.startswith('vendor/'):
        return name in {'tests', 'Tests', '.github'}

    return False


def files_under(source, patterns):
    if os.path.isfile(source):
        yield source
        return

    for directory, dirnames, filenames in os.walk(source):
        kept = []

        for dirname in dirnames:
            child = os.path.join(directory, dirname)
            relative = archive_name(child)

            if skip_directory(dirname, relative) or excluded(relative, patterns):
                continue

            kept.append(dirname)

        dirnames[:] = kept

        for filename in filenames:
            yield os.path.join(directory, filename)


def rewrite_runtime_paths(app_dir):
    needle = os.path.abspath(app_dir)
    targets = [
        os.path.join(app_dir, 'bootstrap', 'cache'),
        os.path.join(app_dir, 'storage', 'framework', 'views'),
    ]

    for directory in targets:
        if not os.path.isdir(directory):
            continue

        for current, _dirs, filenames in os.walk(directory):
            for filename in filenames:
                if not filename.endswith('.php'):
                    continue

                path = os.path.join(current, filename)
                file = open(path, 'r', encoding='utf-8', errors='surrogateescape')
                text = file.read()
                file.close()
                updated = text.replace(needle, '/app')

                if updated != text:
                    file = open(path, 'w', encoding='utf-8', errors='surrogateescape')
                    file.write(updated)
                    file.close()


def bake_artifacts(app_dir):
    """Compile views and config before the archive is built.

    The Worker otherwise compiles every Blade file during boot and overflows
    the WebAssembly memory. A cached config file tells the runtime to skip that.
    """

    if not os.path.isfile(os.path.join(app_dir, 'vendor', 'autoload.php')):
        return

    if os.path.isfile(os.path.join(app_dir, 'bootstrap', 'cache', 'config.php')):
        return

    env = os.environ.copy()
    app_key = env.get('APP_KEY', '')

    if not app_key.startswith('base64:'):
        app_key = 'base64:' + base64.b64encode(os.urandom(32)).decode('ascii')

    database = os.path.join('/tmp', 'wedding-bake.sqlite')
    open(database, 'ab').close()
    env.update({
        'APP_ENV': 'production',
        'APP_DEBUG': 'false',
        'APP_KEY': app_key,
        'DB_CONNECTION': 'sqlite',
        'DB_DATABASE': database,
        'SESSION_DRIVER': 'cookie',
        'CACHE_STORE': 'array',
        'QUEUE_CONNECTION': 'sync',
        'LOG_CHANNEL': 'stderr',
        'BROADCAST_CONNECTION': 'log',
    })

    for command in (
        ['php', 'artisan', 'view:cache', '--no-interaction'],
        ['php', 'artisan', 'config:cache', '--no-interaction'],
    ):
        completed = subprocess.run(command, cwd=app_dir, env=env)

        if completed.returncode != 0:
            print('zip-shim: ' + ' '.join(command) + ' failed', file=sys.stderr)

    if os.path.isfile(os.path.join(app_dir, 'bootstrap', 'cache', 'config.php')):
        rewrite_runtime_paths(app_dir)


def main(argv):
    if '--version' in argv or '-v' in argv:
        print('zip-shim 1.1')
        return 0

    positionals = []
    patterns = []
    excluding = False

    for arg in argv[1:]:
        if arg == '-x':
            excluding = True
            continue

        if excluding:
            patterns.append(arg)
            continue

        if arg.startswith('-') and not arg.startswith('--'):
            continue

        positionals.append(arg)

    if not positionals:
        print('usage: zip [-qr] archive files [-x patterns]', file=sys.stderr)
        return 1

    archive = positionals[0]
    sources = positionals[1:] or ['.']
    creating = not os.path.exists(archive)
    mode = 'a' if not creating else 'w'

    if creating and os.path.isfile('artisan'):
        bake_artifacts(os.getcwd())
    output = archive_name(os.path.abspath(archive))

    with zipfile.ZipFile(archive, mode, compression=zipfile.ZIP_DEFLATED, allowZip64=False) as bundle:
        existing = set(bundle.namelist())

        for source in sources:
            for path in files_under(source, patterns):
                name = archive_name(path)

                if name == output or name in existing or excluded(name, patterns):
                    continue

                bundle.write(path, name)
                existing.add(name)

    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
