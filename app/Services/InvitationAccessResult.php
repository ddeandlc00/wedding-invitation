<?php

namespace App\Services;

use App\Models\Invitation;

class InvitationAccessResult
{
    private function __construct(
        public ?Invitation $invitation,
        public string $outcome,
    ) {}

    public static function valid(Invitation $invitation): self
    {
        return new self($invitation, 'valid');
    }

    public static function invalid(): self
    {
        return new self(null, 'invalid');
    }

    public static function disabled(Invitation $invitation): self
    {
        return new self($invitation, 'disabled');
    }

    public static function expired(Invitation $invitation): self
    {
        return new self($invitation, 'expired');
    }

    public function message(): string
    {
        return match ($this->outcome) {
            'disabled' => 'This invitation is no longer active. Please contact your hosts.',
            'expired' => 'This invitation link has expired. Please contact your hosts.',
            default => 'That invitation code was not recognized. Please check it and try again.',
        };
    }
}
