<?php

namespace App\Models;

use App\Support\PublicMedia;
use App\Support\WeddingClock;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $partner_one_name
 * @property string $partner_two_name
 * @property string|null $wedding_at
 * @property string $timezone
 * @property string $welcome_message
 * @property string $invitation_message
 * @property Carbon|null $rsvp_deadline
 * @property bool $rsvp_enabled
 * @property bool $allow_rsvp_edits
 * @property string|null $dress_code
 * @property string|null $suggested_arrival
 * @property string|null $parking_information
 * @property string|null $transportation_guidance
 * @property string|null $gift_preferences
 * @property string|null $registry_url
 * @property string|null $contact_email
 * @property string|null $contact_phone
 * @property string|null $contact_note
 * @property string $post_wedding_message
 * @property string|null $hero_image_path
 * @property array<string, mixed> $theme
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'partner_one_name',
    'partner_two_name',
    'wedding_at',
    'timezone',
    'welcome_message',
    'invitation_message',
    'rsvp_deadline',
    'rsvp_enabled',
    'allow_rsvp_edits',
    'dress_code',
    'suggested_arrival',
    'parking_information',
    'transportation_guidance',
    'gift_preferences',
    'registry_url',
    'contact_email',
    'contact_phone',
    'contact_note',
    'post_wedding_message',
    'hero_image_path',
    'theme',
])]
class WeddingSetting extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'rsvp_deadline' => 'datetime',
            'rsvp_enabled' => 'boolean',
            'allow_rsvp_edits' => 'boolean',
            'theme' => 'array',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function defaultTheme(): array
    {
        return [
            'ivory' => '#f6f1e8',
            'paper' => '#fffdf9',
            'ink' => '#2c2824',
            'muted' => '#6f665d',
            'champagne' => '#a68456',
            'sage' => '#3f5344',
            'heading_font' => 'Cormorant Garamond',
            'body_font' => 'Outfit',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function defaults(): array
    {
        return [
            'partner_one_name' => '',
            'partner_two_name' => '',
            'wedding_at' => null,
            'timezone' => 'UTC',
            'welcome_message' => 'We are so glad you are here. Use your invitation code to open your personal invitation and send your RSVP.',
            'invitation_message' => 'We are delighted to invite you to celebrate our wedding. It would mean so much to us to have you join us as we begin this beautiful new chapter of our lives.',
            'rsvp_deadline' => null,
            'rsvp_enabled' => true,
            'allow_rsvp_edits' => true,
            'dress_code' => null,
            'suggested_arrival' => null,
            'parking_information' => null,
            'transportation_guidance' => null,
            'gift_preferences' => null,
            'registry_url' => null,
            'contact_email' => null,
            'contact_phone' => null,
            'contact_note' => null,
            'post_wedding_message' => 'Thank you for celebrating with us.',
            'hero_image_path' => null,
            'theme' => self::defaultTheme(),
        ];
    }

    public static function current(): self
    {
        $existing = static::query()->first();

        if ($existing instanceof self) {
            return $existing;
        }

        $created = static::query()->create(self::defaults());

        return $created;
    }

    public function coupleLabel(): string
    {
        $names = array_values(array_filter([
            trim($this->partner_one_name),
            trim($this->partner_two_name),
        ], fn (string $name): bool => $name !== ''));

        if ($names === []) {
            return 'Our Wedding';
        }

        return implode(' & ', $names);
    }

    public function monogram(): string
    {
        $first = mb_substr(trim($this->partner_one_name), 0, 1);
        $second = mb_substr(trim($this->partner_two_name), 0, 1);
        $mark = mb_strtoupper($first.$second);

        return $mark !== '' ? $mark : 'W';
    }

    public function weddingInstant(): ?CarbonImmutable
    {
        return WeddingClock::parseLocal($this->wedding_at, $this->timezone);
    }

    /**
     * @return array<string, string>
     */
    public function resolvedTheme(): array
    {
        $theme = array_merge(self::defaultTheme(), $this->theme ?? []);
        $resolved = [];

        foreach (self::defaultTheme() as $key => $fallback) {
            $value = $theme[$key] ?? $fallback;
            if (in_array($key, ['heading_font', 'body_font'], true)) {
                $resolved[$key] = self::allowedFont($key, is_string($value) ? $value : $fallback);

                continue;
            }

            $resolved[$key] = self::hexColor(is_string($value) ? $value : null, $fallback);
        }

        return $resolved;
    }

    public static function hexColor(?string $value, string $fallback): string
    {
        if ($value !== null && preg_match('/^#[0-9A-Fa-f]{6}$/', $value) === 1) {
            return strtolower($value);
        }

        return strtolower($fallback);
    }

    public static function allowedFont(string $key, string $value): string
    {
        $allowed = $key === 'heading_font'
            ? ['Cormorant Garamond', 'Georgia']
            : ['Outfit', 'Instrument Sans', 'Georgia'];

        return in_array($value, $allowed, true) ? $value : self::defaultTheme()[$key];
    }

    public function heroUrl(): ?string
    {
        return PublicMedia::url($this->hero_image_path);
    }
}
