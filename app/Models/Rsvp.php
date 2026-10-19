<?php

namespace App\Models;

use App\Enums\AttendanceStatus;
use App\Enums\RsvpSource;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $invitation_id
 * @property AttendanceStatus $attendance_status
 * @property int $attendee_count
 * @property string|null $dietary_requirements
 * @property string|null $message_to_couple
 * @property RsvpSource $source
 * @property Carbon|null $submitted_at
 * @property int|null $updated_by
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Invitation $invitation
 */
#[Fillable([
    'invitation_id',
    'attendance_status',
    'attendee_count',
    'dietary_requirements',
    'message_to_couple',
    'source',
    'submitted_at',
    'updated_by',
])]
class Rsvp extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'attendance_status' => AttendanceStatus::class,
            'source' => RsvpSource::class,
            'attendee_count' => 'integer',
            'submitted_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<Invitation, $this>
     */
    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }

    /**
     * @return HasMany<RsvpGuest, $this>
     */
    public function guests(): HasMany
    {
        return $this->hasMany(RsvpGuest::class)->orderBy('sort_order');
    }

    /**
     * @return BelongsToMany<WeddingEvent, $this>
     */
    public function events(): BelongsToMany
    {
        return $this->belongsToMany(WeddingEvent::class, 'rsvp_wedding_event');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
