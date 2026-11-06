#!/usr/bin/env python3
"""Info-ZIP-compatible packer for the Workers PHP build image, which has no zip binary."""

import os
import re
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
    mode = 'a' if os.path.exists(archive) else 'w'
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
