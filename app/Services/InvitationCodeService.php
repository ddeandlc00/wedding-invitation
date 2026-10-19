<?php

namespace App\Services;

use App\Models\Invitation;
use Illuminate\Support\Facades\Crypt;
use RuntimeException;

class InvitationCodeService
{
    private const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

    public function generatePlainCode(): string
    {
        $characters = '';
        $bytes = random_bytes(24);
        $alphabetLength = strlen(self::ALPHABET);

        for ($index = 0; $index < 24; $index++) {
            $characters .= self::ALPHABET[ord($bytes[$index]) % $alphabetLength];
        }

        return implode('-', str_split($characters, 4));
    }

    public function normalize(string $code): string
    {
        $normalized = strtoupper(trim($code));
        $normalized = str_replace([' ', '-', '_'], '', $normalized);

        return strtr($normalized, [
            'I' => '1',
            'L' => '1',
            'O' => '0',
        ]);
    }

    public function hash(string $code): string
    {
        return hash('sha256', $this->normalize($code));
    }

    public function findByPlainCode(string $code): ?Invitation
    {
        $normalized = $this->normalize($code);

        if (strlen($normalized) < 16 || strlen($normalized) > 64) {
            return null;
        }

        if (preg_match('/^[0-9A-HJKMNP-TV-Z]+$/', $normalized) !== 1) {
            return null;
        }

        return Invitation::query()->where('code_lookup', $this->hash($code))->first();
    }

    /**
     * @return array{plain: string, hash: string, encrypted: string}
     */
    public function issue(): array
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $plain = $this->generatePlainCode();
            $hash = $this->hash($plain);

            $exists = Invitation::query()->where('code_lookup', $hash)->exists();

            if (! $exists) {
                return [
                    'plain' => $plain,
                    'hash' => $hash,
                    'encrypted' => Crypt::encryptString($plain),
                ];
            }
        }

        throw new RuntimeException('Unable to generate a unique invitation code.');
    }
}
