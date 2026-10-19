<?php

namespace App\Services;

use App\Enums\AttendanceStatus;
use App\Enums\RsvpSource;
use App\Models\Invitation;
use App\Models\Rsvp;
use App\Models\User;
use App\Models\WeddingEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class RsvpService
{
    public function __construct(private AuditLogger $audit) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public function save(
        Invitation $invitation,
        array $data,
        RsvpSource $source,
        ?User $actor,
        ?Request $request = null,
    ): Rsvp {
        if ($source === RsvpSource::Guest) {
            $reason = $invitation->rsvpBlockReason();

            if ($reason !== null) {
                throw ValidationException::withMessages([
                    'attendance_status' => $reason,
                ]);
            }
        }

        $status = AttendanceStatus::from((string) $data['attendance_status']);
        $count = $status === AttendanceStatus::Declined ? 0 : (int) $data['attendee_count'];

        if ($status === AttendanceStatus::Attending && ($count < 1 || $count > $invitation->max_pax)) {
            throw ValidationException::withMessages([
                'attendee_count' => "Enter between 1 and {$invitation->max_pax} attendees.",
            ]);
        }

        /** @var array<int, mixed> $guestInput */
        $guestInput = is_array($data['guests'] ?? null) ? array_values($data['guests']) : [];
        $guests = [];

        if ($status === AttendanceStatus::Attending && $invitation->collect_guest_names) {
            if (count($guestInput) !== $count) {
                throw ValidationException::withMessages([
                    'guests' => 'Enter one name for each attending guest.',
                ]);
            }

            foreach ($guestInput as $guest) {
                if (! is_array($guest) || ! is_string($guest['name'] ?? null) || trim($guest['name']) === '') {
                    throw ValidationException::withMessages([
                        'guests' => 'Enter one name for each attending guest.',
                    ]);
                }

                $dietary = $guest['dietary_requirement'] ?? null;
                $guests[] = [
                    'name' => trim($guest['name']),
                    'dietary_requirement' => is_string($dietary) && trim($dietary) !== '' ? trim($dietary) : null,
                ];
            }
        }

        /** @var array<int, mixed> $eventInput */
        $eventInput = is_array($data['event_ids'] ?? null) ? $data['event_ids'] : [];
        $eventIds = $status === AttendanceStatus::Attending
            ? $this->eventIds($eventInput)
            : [];

        $dietary = $data['dietary_requirements'] ?? null;
        $message = $data['message_to_couple'] ?? null;

        return DB::transaction(function () use ($invitation, $status, $count, $guests, $eventIds, $dietary, $message, $source, $actor, $request): Rsvp {
            $existing = $invitation->rsvp()->first();
            $submittedAt = now();

            if ($existing instanceof Rsvp && $existing->submitted_at !== null) {
                $submittedAt = $existing->submitted_at;
            }

            $rsvp = Rsvp::query()->updateOrCreate(
                ['invitation_id' => $invitation->id],
                [
                    'attendance_status' => $status,
                    'attendee_count' => $count,
                    'dietary_requirements' => is_string($dietary) && trim($dietary) !== '' ? trim($dietary) : null,
                    'message_to_couple' => is_string($message) && trim($message) !== '' ? trim($message) : null,
                    'source' => $source,
                    'submitted_at' => $submittedAt,
                    'updated_by' => $actor?->id,
                ],
            );

            $rsvp->guests()->delete();

            foreach ($guests as $index => $guest) {
                $rsvp->guests()->create([
                    'guest_name' => $guest['name'],
                    'dietary_requirement' => $guest['dietary_requirement'],
                    'sort_order' => $index,
                ]);
            }

            $rsvp->events()->sync($eventIds);

            if ($source === RsvpSource::Organizer) {
                $this->audit->log(
                    'rsvp.manual_update',
                    $rsvp,
                    [
                        'invitation_id' => $invitation->id,
                        'attendance_status' => $status->value,
                        'attendee_count' => $count,
                    ],
                    $actor,
                    $request,
                );
            }

            return $rsvp->refresh();
        });
    }

    /**
     * @param  array<int, mixed>  $ids
     * @return array<int, int>
     */
    private function eventIds(array $ids): array
    {
        $requested = array_values(array_unique(array_map(
            fn (mixed $id): int => (int) $id,
            $ids,
        )));

        $valid = WeddingEvent::query()->whereIn('id', $requested)->pluck('id')->map(
            fn (mixed $id): int => (int) $id,
        )->all();

        if (count($valid) !== count($requested)) {
            throw ValidationException::withMessages([
                'event_ids' => 'Choose only the listed wedding events.',
            ]);
        }

        $available = WeddingEvent::query()->count();

        if ($available > 1 && $valid === []) {
            throw ValidationException::withMessages([
                'event_ids' => 'Select at least one event you will attend.',
            ]);
        }

        if ($available === 1 && $valid === []) {
            return WeddingEvent::query()->pluck('id')->map(fn (mixed $id): int => (int) $id)->all();
        }

        return $valid;
    }
}
