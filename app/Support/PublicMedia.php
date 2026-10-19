<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class PublicMedia
{
    public static function url(?string $path): ?string
    {
        if ($path === null || $path === '') {
            return null;
        }

        if (str_contains($path, '..') || str_starts_with($path, '/') || str_contains($path, '://')) {
            return null;
        }

        return Storage::disk('public')->url($path);
    }

    public static function store(UploadedFile $file, string $directory): string
    {
        $stored = $file->store($directory, 'public');

        if ($stored === false) {
            throw new RuntimeException('The image could not be stored.');
        }

        return $stored;
    }

    public static function delete(?string $path): void
    {
        if ($path === null || $path === '' || str_contains($path, '..') || str_contains($path, '://')) {
            return;
        }

        Storage::disk('public')->delete($path);
    }
}
