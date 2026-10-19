<?php

namespace App\Enums;

enum RsvpSource: string
{
    case Guest = 'guest';
    case Organizer = 'organizer';

    public function label(): string
    {
        return match ($this) {
            self::Guest => 'Submitted online',
            self::Organizer => 'Entered by the organizer',
        };
    }
}
