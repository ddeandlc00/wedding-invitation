<?php

namespace App\Services;

use App\Enums\AttendanceStatus;
use App\Models\Invitation;
use App\Models\Rsvp;
use App\Models\WeddingEvent;
use App\Models\WeddingSetting;
use App\Support\WeddingClock;
use Illuminate\Support\Facades\DB;

class DashboardStats
{
    /**
     * @return array<string, mixed>
     */
    public function summary(): array
    {
        $invitations = Invitation::query()->count();
        $active = Invitation::query()->where('status', 'active');
        $invitedCapacity = (int) (clone $active)->sum('max_pax');
        $awaiting = Invitation::query()->where('status', 'active')->whereDoesntHave('rsvp')->count();
        $attending = Rsvp::query()->where('attendance_status', AttendanceStatus::Attending)->count();
        $declined = Rsvp::query()->where('attendance_status', AttendanceStatus::Declined)->count();
        $confirmed = (int) Rsvp::query()->where('attendance_status', AttendanceStatus::Attending)->sum('attendee_count');
        $unconfirmedCapacity = (int) Invitation::query()
            ->where('status', 'active')
            ->whereDoesntHave('rsvp')
            ->sum('max_pax');
        $declinedCapacity = (int) Invitation::query()
            ->whereHas('rsvp', fn ($query) => $query->where('attendance_status', AttendanceStatus::Declined))
            ->sum('max_pax');
        $disabled = Invitation::query()->where('status', 'disabled')->count();

        $trend = Rsvp::query()
            ->whereNotNull('submitted_at')
            ->selectRaw('DATE(submitted_at) as day, COUNT(*) as total')
            ->groupBy(DB::raw('DATE(submitted_at)'))
            ->orderBy('day')
            ->get()
            ->map(fn ($row): array => [
                'day' => (string) $row->getAttribute('day'),
                'total' => (int) $row->getAttribute('total'),
            ])
            ->values()
            ->all();

        $timezone = WeddingSetting::current()->timezone;
        $events = WeddingEvent::query()->orderBy('sort_order')->orderBy('id')->get()->map(function (WeddingEvent $event) use ($timezone): array {
            $confirmedForEvent = (int) Rsvp::query()
                ->where('attendance_status', AttendanceStatus::Attending)
                ->whereHas('events', fn ($query) => $query->where('wedding_events.id', $event->id))
                ->sum('attendee_count');

            return [
                'name' => $event->name,
                'confirmed' => $confirmedForEvent,
                'when' => WeddingClock::dateTimeLabel($event->startsAtInstant(), $timezone),
            ];
        })->all();

        return [
            'invitations' => $invitations,
            'households' => $invitations,
            'invitedCapacity' => $invitedCapacity,
            'awaiting' => $awaiting,
            'attending' => $attending,
            'declined' => $declined,
            'confirmedAttendees' => $confirmed,
            'unconfirmedCapacity' => $unconfirmedCapacity,
            'declinedCapacity' => $declinedCapacity,
            'disabled' => $disabled,
            'statusChart' => [
                ['label' => 'Awaiting Response', 'value' => $awaiting],
                ['label' => 'Attending', 'value' => $attending],
                ['label' => 'Unable to Attend', 'value' => $declined],
            ],
            'capacityChart' => [
                ['label' => 'Confirmed attendees', 'value' => $confirmed],
                ['label' => 'Unconfirmed capacity', 'value' => $unconfirmedCapacity],
                ['label' => 'Declined capacity', 'value' => $declinedCapacity],
            ],
            'trend' => $trend,
            'events' => $events,
        ];
    }
}
