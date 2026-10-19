<?php

namespace App\Models;

use App\Support\WeddingClock;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $starts_at
 * @property string|null $ends_at
 * @property string|null $venue_name
 * @property string|null $address
 * @property string|null $map_url
 * @property int $sort_order
 * @property bool $is_sample
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'description',
    'starts_at',
    'ends_at',
    'venue_name',
    'address',
    'map_url',
    'sort_order',
    'is_sample',
])]
class WeddingEvent extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'is_sample' => 'boolean',
        ];
    }

    /**
     * @return BelongsToMany<Rsvp, $this>
     */
    public function rsvps(): BelongsToMany
    {
        return $this->belongsToMany(Rsvp::class, 'rsvp_wedding_event');
    }

    public function startsAtInstant(): ?CarbonImmutable
    {
        return WeddingClock::parseLocal($this->starts_at, WeddingSetting::current()->timezone);
    }

    public function endsAtInstant(): ?CarbonImmutable
    {
        return WeddingClock::parseLocal($this->ends_at, WeddingSetting::current()->timezone);
    }

    /**
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        $timezone = WeddingSetting::current()->timezone;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'dateLabel' => WeddingClock::dateLabel($this->startsAtInstant(), $timezone),
            'timeLabel' => WeddingClock::timeLabel($this->startsAtInstant(), $timezone),
            'endTimeLabel' => WeddingClock::timeLabel($this->endsAtInstant(), $timezone),
            'venueName' => $this->venue_name,
            'address' => $this->address,
            'mapUrl' => $this->safeMapUrl(),
            'isSample' => $this->is_sample,
            'sortOrder' => $this->sort_order,
        ];
    }

    public function safeMapUrl(): ?string
    {
        if ($this->map_url === null) {
            return null;
        }

        if (preg_match('/^https?:\/\//i', $this->map_url) !== 1) {
            return null;
        }

        return $this->map_url;
    }
}
