<?php

namespace App\Enums;

enum AttendanceStatus: string
{
    case Attending = 'attending';
    case Declined = 'declined';

    public function label(): string
    {
        return match ($this) {
            self::Attending => 'Attending',
            self::Declined => 'Unable to Attend',
        };
    }
}
