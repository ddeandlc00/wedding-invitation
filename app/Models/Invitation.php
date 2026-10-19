<?php

namespace App\Models;

use App\Enums\InvitationStatus;
use App\Support\WeddingClock;
use Carbon\CarbonInterface;
use Database\Factories\InvitationFactory;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Crypt;

/**
 * @property int $id
 * @property string $invitee_name
 * @property string|null $contact_name
 * @property string|null $email
 * @property string|null $contact_information
 * @property string $code_lookup
 * @property string $code_encrypted
 * @property int $max_pax
 * @property InvitationStatus $status
 * @property string|null $personal_message
 * @property string|null $organizer_notes
 * @property CarbonInterface|null $rsvp_deadline
 * @property CarbonInterface|null $expires_at
 * @property bool $collect_guest_names
 * @property int|null $created_by
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Rsvp|null $rsvp
 * @property-read User|null $creator
 */
#[Fillable([
    'invitee_name',
    'contact_name',
    'email',
    'contact_information',
    'code_lookup',
    'code_encrypted',
    'max_pax',
    'status',
    'personal_message',
    'organizer_notes',
    'rsvp_deadline',
    'expires_at',
    'collect_guest_names',
    'created_by',
])]
#[Hidden(['code_lookup', 'code_encrypted'])]
class Invitation extends Model
{
    /** @use HasFactory<InvitationFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => InvitationStatus::class,
            'rsvp_deadline' => 'datetime',
            'expires_at' => 'datetime',
            'collect_guest_names' => 'boolean',
            'max_pax' => 'integer',
        ];
    }

    /**
     * @return HasOne<Rsvp, $this>
     */
    public function rsvp(): HasOne
    {
        return $this->hasOne(Rsvp::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function plainCode(): ?string
    {
        try {
            $code = Crypt::decryptString($this->code_encrypted);
        } catch (DecryptException) {
            return null;
        }

        return $code === '' ? null : $code;
    }

    public function shareUrl(): ?string
    {
        $code = $this->plainCode();

        if ($code === null) {
            return null;
        }

        return route('invitation.enter', ['code' => $code]);
    }

    public function allowanceLabel(): string
    {
        if ($this->max_pax === 1) {
            return 'This invitation is for one guest.';
        }

        return "You are invited with up to {$this->max_pax} guests.";
    }

    public function effectiveDeadline(): ?CarbonInterface
    {
        return $this->rsvp_deadline ?? WeddingSetting::current()->rsvp_deadline;
    }

    public function rsvpBlockReason(): ?string
    {
        if ($this->status !== InvitationStatus::Active) {
            return 'This invitation is not active.';
        }

        if ($this->expires_at?->isPast()) {
            return 'This invitation has expired.';
        }

        $settings = WeddingSetting::current();

        if (! $settings->rsvp_enabled) {
            return 'RSVPs are not open yet.';
        }

        $deadline = $this->effectiveDeadline();

        if ($deadline !== null && $deadline->isPast()) {
            return 'The RSVP deadline has passed, so this response can no longer be submitted or changed.';
        }

        if ($this->rsvp !== null && ! $settings->allow_rsvp_edits) {
            return 'RSVP changes are closed. Please contact the couple if you need to update your response.';
        }

        return null;
    }

    public function deadlineLabel(): ?string
    {
        $deadline = $this->effectiveDeadline();

        if ($deadline === null) {
            return null;
        }

        return WeddingClock::dateTimeLabel(
            Carbon::parse($deadline)->toImmutable(),
            WeddingSetting::current()->timezone,
        );
    }
}
