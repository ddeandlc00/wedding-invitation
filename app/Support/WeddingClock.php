<?php

namespace App\Support;

use Carbon\CarbonImmutable;
use Throwable;

class WeddingClock
{
    public static function timezone(?string $timezone): string
    {
        if (is_string($timezone) && in_array($timezone, timezone_identifiers_list(), true)) {
            return $timezone;
        }

        return 'UTC';
    }

    public static function parseLocal(?string $value, ?string $timezone): ?CarbonImmutable
    {
        if ($value === null || trim($value) === '') {
            return null;
        }

        try {
            return CarbonImmutable::parse($value, self::timezone($timezone));
        } catch (Throwable) {
            return null;
        }
    }

    public static function dateLabel(?CarbonImmutable $instant, ?string $timezone): ?string
    {
        if ($instant === null) {
            return null;
        }

        return $instant->timezone(self::timezone($timezone))->format('l, F j, Y');
    }

    public static function timeLabel(?CarbonImmutable $instant, ?string $timezone): ?string
    {
        if ($instant === null) {
            return null;
        }

        $zone = self::timezone($timezone);

        return $instant->timezone($zone)->format('g:i A').' '.$zone;
    }

    public static function dateTimeLabel(?CarbonImmutable $instant, ?string $timezone): ?string
    {
        $date = self::dateLabel($instant, $timezone);
        $time = self::timeLabel($instant, $timezone);

        if ($date === null || $time === null) {
            return null;
        }

        return $date.' at '.$time;
    }

    public static function localInput(?string $stored): ?string
    {
        if ($stored === null || trim($stored) === '') {
            return null;
        }

        $parsed = self::parseLocal($stored, 'UTC');

        return $parsed?->format('Y-m-d\TH:i');
    }

    public static function normalizeLocalInput(?string $input, ?string $timezone): ?string
    {
        $parsed = self::parseLocal($input, $timezone);

        return $parsed?->format('Y-m-d H:i:s');
    }
}
