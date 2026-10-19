<?php

namespace App\Services;

use App\Models\Faq;
use App\Models\GalleryImage;
use App\Models\Invitation;
use App\Models\Rsvp;
use App\Models\RsvpGuest;
use App\Models\StoryMoment;
use App\Models\WeddingEvent;
use App\Models\WeddingSetting;
use App\Support\WeddingClock;
use Carbon\CarbonInterface;

class WeddingPresenter
{
    /**
     * @return array<string, mixed>
     */
    public function shared(): array
    {
        $settings = WeddingSetting::current();
        $theme = $settings->resolvedTheme();
        $instant = $settings->weddingInstant();

        return [
            'couple' => $settings->coupleLabel(),
            'monogram' => $settings->monogram(),
            'partnerOne' => $settings->partner_one_name,
            'partnerTwo' => $settings->partner_two_name,
            'namesConfigured' => trim($settings->partner_one_name.$settings->partner_two_name) !== '',
            'welcomeMessage' => $settings->welcome_message,
            'dateLabel' => WeddingClock::dateLabel($instant, $settings->timezone),
            'timeLabel' => WeddingClock::timeLabel($instant, $settings->timezone),
            'timezone' => WeddingClock::timezone($settings->timezone),
            'theme' => [
                ...$theme,
                'headingStack' => $this->fontStack($theme['heading_font'], 'heading'),
                'bodyStack' => $this->fontStack($theme['body_font'], 'body'),
            ],
            'countdown' => [
                'target' => $instant?->utc()->toIso8601String(),
                'passed' => $instant?->isPast() ?? false,
                'scheduled' => $instant !== null,
                'postMessage' => $settings->post_wedding_message,
                'timezone' => WeddingClock::timezone($settings->timezone),
            ],
            'heroUrl' => $settings->heroUrl(),
            'contactEmail' => $settings->contact_email,
            'contactPhone' => $settings->contact_phone,
            'navigation' => [
                ['label' => 'Our Story', 'href' => route('story', absolute: false)],
                ['label' => 'Wedding Details', 'href' => route('details', absolute: false)],
                ['label' => 'Itinerary', 'href' => route('itinerary', absolute: false)],
                ['label' => 'Questions', 'href' => route('faq', absolute: false)],
                ['label' => 'Gallery', 'href' => route('gallery', absolute: false)],
                ['label' => 'Registry', 'href' => route('registry', absolute: false)],
                ['label' => 'Contact', 'href' => route('contact', absolute: false)],
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function details(): array
    {
        $settings = WeddingSetting::current();
        $events = WeddingEvent::query()->orderBy('sort_order')->orderBy('id')->get();

        return [
            'events' => $events->map(fn (WeddingEvent $event): array => $event->toPublicArray())->all(),
            'hasSampleEvents' => $events->contains(fn (WeddingEvent $event): bool => $event->is_sample),
            'dressCode' => $settings->dress_code,
            'suggestedArrival' => $settings->suggested_arrival,
            'parking' => $settings->parking_information,
            'transportation' => $settings->transportation_guidance,
            'giftPreferences' => $settings->gift_preferences,
            'registryUrl' => $this->httpUrl($settings->registry_url),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function story(): array
    {
        $moments = StoryMoment::query()->orderBy('sort_order')->orderBy('id')->get();

        return [
            'moments' => $moments->map(fn (StoryMoment $moment): array => $moment->toPublicArray())->all(),
            'hasSample' => $moments->contains(fn (StoryMoment $moment): bool => $moment->is_sample),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function faqs(): array
    {
        $faqs = Faq::query()->where('is_published', true)->orderBy('sort_order')->orderBy('id')->get();

        return [
            'faqs' => $faqs->map(fn (Faq $faq): array => $faq->toPublicArray())->all(),
            'hasSample' => $faqs->contains(fn (Faq $faq): bool => $faq->is_sample),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function gallery(): array
    {
        return [
            'images' => GalleryImage::query()->orderBy('sort_order')->orderBy('id')->get()
                ->map(fn (GalleryImage $image): array => $image->toPublicArray())
                ->all(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function contact(): array
    {
        $settings = WeddingSetting::current();

        return [
            'email' => $settings->contact_email,
            'phone' => $settings->contact_phone,
            'note' => $settings->contact_note,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function forGuest(Invitation $invitation): array
    {
        $settings = WeddingSetting::current();
        $invitation->loadMissing('rsvp.guests', 'rsvp.events');

        return [
            'inviteeName' => $invitation->invitee_name,
            'greeting' => 'Dear '.$invitation->invitee_name.',',
            'message' => $invitation->personal_message ?: $settings->invitation_message,
            'maxPax' => $invitation->max_pax,
            'allowanceLabel' => $invitation->allowanceLabel(),
            'collectGuestNames' => $invitation->collect_guest_names,
            'rsvpOpen' => $invitation->rsvpBlockReason() === null,
            'rsvpClosedMessage' => $invitation->rsvpBlockReason(),
            'deadlineLabel' => $invitation->deadlineLabel(),
            'rsvp' => $invitation->rsvp instanceof Rsvp ? $this->rsvpPayload($invitation->rsvp) : null,
            'statusLabel' => $invitation->rsvp instanceof Rsvp
                ? $invitation->rsvp->attendance_status->label()
                : 'Awaiting Response',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function forAdmin(Invitation $invitation): array
    {
        $invitation->loadMissing('rsvp.guests', 'rsvp.events');
        $code = $invitation->plainCode();

        return [
            'id' => $invitation->id,
            'inviteeName' => $invitation->invitee_name,
            'contactName' => $invitation->contact_name,
            'email' => $invitation->email,
            'contactInformation' => $invitation->contact_information,
            'maxPax' => $invitation->max_pax,
            'status' => $invitation->status->value,
            'statusLabel' => $invitation->status->label(),
            'personalMessage' => $invitation->personal_message,
            'organizerNotes' => $invitation->organizer_notes,
            'collectGuestNames' => $invitation->collect_guest_names,
            'rsvpDeadline' => $invitation->rsvp_deadline?->timezone(WeddingSetting::current()->timezone)->format('Y-m-d\TH:i'),
            'expiresAt' => $invitation->expires_at?->timezone(WeddingSetting::current()->timezone)->format('Y-m-d\TH:i'),
            'code' => $code,
            'url' => $code === null ? null : route('invitation.enter', ['code' => $code]),
            'createdAt' => WeddingClock::dateTimeLabel(
                $invitation->created_at?->toImmutable(),
                WeddingSetting::current()->timezone,
            ),
            'rsvp' => $invitation->rsvp instanceof Rsvp ? $this->rsvpPayload($invitation->rsvp) : null,
            'statusSummary' => $invitation->rsvp instanceof Rsvp
                ? $invitation->rsvp->attendance_status->label()
                : 'Awaiting Response',
            'confirmedAttendees' => $invitation->rsvp instanceof Rsvp && $invitation->rsvp->attendance_status->value === 'attending'
                ? $invitation->rsvp->attendee_count
                : 0,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function rsvpPayload(Rsvp $rsvp): array
    {
        $timezone = WeddingSetting::current()->timezone;

        return [
            'attendanceStatus' => $rsvp->attendance_status->value,
            'statusLabel' => $rsvp->attendance_status->label(),
            'attendeeCount' => $rsvp->attendee_count,
            'guests' => $rsvp->guests->map(fn (RsvpGuest $guest): array => [
                'name' => $guest->guest_name,
                'dietaryRequirement' => $guest->dietary_requirement,
            ])->all(),
            'eventIds' => $rsvp->events->pluck('id')->map(fn (mixed $id): int => (int) $id)->all(),
            'dietaryRequirements' => $rsvp->dietary_requirements,
            'messageToCouple' => $rsvp->message_to_couple,
            'submittedAt' => $this->stamp($rsvp->submitted_at, $timezone),
            'updatedAt' => $this->stamp($rsvp->updated_at, $timezone),
            'source' => $rsvp->source->value,
            'sourceLabel' => $rsvp->source->label(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function settingsForm(): array
    {
        $settings = WeddingSetting::current();
        $timezone = $settings->timezone;

        return [
            'partnerOne' => $settings->partner_one_name,
            'partnerTwo' => $settings->partner_two_name,
            'weddingAt' => WeddingClock::localInput($settings->wedding_at),
            'timezone' => $timezone,
            'timezones' => timezone_identifiers_list(),
            'welcomeMessage' => $settings->welcome_message,
            'invitationMessage' => $settings->invitation_message,
            'rsvpDeadline' => $settings->rsvp_deadline?->timezone($timezone)->format('Y-m-d\TH:i'),
            'rsvpEnabled' => $settings->rsvp_enabled,
            'allowRsvpEdits' => $settings->allow_rsvp_edits,
            'dressCode' => $settings->dress_code ?? '',
            'suggestedArrival' => $settings->suggested_arrival ?? '',
            'parking' => $settings->parking_information ?? '',
            'transportation' => $settings->transportation_guidance ?? '',
            'giftPreferences' => $settings->gift_preferences ?? '',
            'registryUrl' => $settings->registry_url ?? '',
            'contactEmail' => $settings->contact_email ?? '',
            'contactPhone' => $settings->contact_phone ?? '',
            'contactNote' => $settings->contact_note ?? '',
            'postWeddingMessage' => $settings->post_wedding_message,
            'heroUrl' => $settings->heroUrl(),
            'theme' => $settings->resolvedTheme(),
            'headingFonts' => ['Cormorant Garamond', 'Georgia'],
            'bodyFonts' => ['Outfit', 'Instrument Sans', 'Georgia'],
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function adminEvents(): array
    {
        return WeddingEvent::query()->orderBy('sort_order')->orderBy('id')->get()->map(function (WeddingEvent $event): array {
            return [
                'id' => $event->id,
                'name' => $event->name,
                'description' => $event->description ?? '',
                'startsAt' => WeddingClock::localInput($event->starts_at),
                'endsAt' => WeddingClock::localInput($event->ends_at),
                'venueName' => $event->venue_name ?? '',
                'address' => $event->address ?? '',
                'mapUrl' => $event->map_url ?? '',
                'sortOrder' => $event->sort_order,
                'isSample' => $event->is_sample,
            ];
        })->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function adminMoments(): array
    {
        return StoryMoment::query()->orderBy('sort_order')->orderBy('id')->get()->map(function (StoryMoment $moment): array {
            $public = $moment->toPublicArray();

            return [
                'id' => $moment->id,
                'title' => $moment->title,
                'occurredLabel' => $moment->occurred_label ?? '',
                'body' => $moment->body,
                'caption' => $moment->caption ?? '',
                'imageUrl' => $public['imageUrl'],
                'sortOrder' => $moment->sort_order,
                'isSample' => $moment->is_sample,
            ];
        })->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function adminFaqs(): array
    {
        return Faq::query()->orderBy('sort_order')->orderBy('id')->get()->map(fn (Faq $faq): array => [
            'id' => $faq->id,
            'question' => $faq->question,
            'answer' => $faq->answer,
            'sortOrder' => $faq->sort_order,
            'isSample' => $faq->is_sample,
            'isPublished' => $faq->is_published,
        ])->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function adminGallery(): array
    {
        return GalleryImage::query()->orderBy('sort_order')->orderBy('id')->get()
            ->map(fn (GalleryImage $image): array => $image->toPublicArray())
            ->all();
    }

    private function stamp(?CarbonInterface $instant, string $timezone): ?string
    {
        if ($instant === null) {
            return null;
        }

        return WeddingClock::dateTimeLabel($instant->toImmutable(), $timezone);
    }

    private function httpUrl(?string $url): ?string
    {
        if ($url === null || preg_match('/^https?:\/\//i', $url) !== 1) {
            return null;
        }

        return $url;
    }

    private function fontStack(string $font, string $kind): string
    {
        if ($kind === 'heading') {
            return $font === 'Georgia'
                ? 'Georgia, "Times New Roman", serif'
                : '"Cormorant Garamond", Georgia, "Times New Roman", serif';
        }

        return match ($font) {
            'Instrument Sans' => '"Instrument Sans", "Outfit", ui-sans-serif, sans-serif',
            'Georgia' => 'Georgia, "Times New Roman", serif',
            default => '"Outfit", "Instrument Sans", ui-sans-serif, sans-serif',
        };
    }
}
