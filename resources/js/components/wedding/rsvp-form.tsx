import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import type { GuestInvitation, GuestRsvp, PublicEvent } from '@/types/wedding';

type Guest = { name: string; dietary_requirement: string };

export function RsvpForm({
    invitation,
    events,
    confirmed,
}: {
    invitation: GuestInvitation;
    events: PublicEvent[];
    confirmed: boolean;
}) {
    const existing: GuestRsvp | null = invitation.rsvp;
    const initialCount = existing?.attendanceStatus === 'attending' ? existing.attendeeCount : 1;
    const form = useForm({
        attendance_status: existing?.attendanceStatus ?? 'attending',
        attendee_count: initialCount,
        dietary_requirements: existing?.dietaryRequirements ?? '',
        message_to_couple: existing?.messageToCouple ?? '',
        guests: normalizeGuests(existing, initialCount),
        event_ids: existing?.eventIds ?? events.map((event) => event.id),
    });

    function setCount(count: number) {
        const next = Math.max(1, Math.min(invitation.maxPax, count || 1));
        form.setData((data) => ({
            ...data,
            attendee_count: next,
            guests: resize(data.guests, next),
        }));
    }

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/invitation/rsvp', { preserveScroll: true });
    }

    const closed = !invitation.rsvpOpen;

    return (
        <form onSubmit={submit} className="space-y-6" noValidate>
            {confirmed && (
                <div className="border border-sage/40 bg-sage/10 px-4 py-3 text-sm" role="status">
                    Your RSVP has been saved. You can update it from this page while responses are open.
                </div>
            )}
            {invitation.rsvpClosedMessage && (
                <div className="border border-champagne bg-paper px-4 py-3 text-sm" role="status">
                    {invitation.rsvpClosedMessage}
                </div>
            )}
            <fieldset className="space-y-3" disabled={closed}>
                <legend className="text-sm tracking-[0.14em] text-taupe uppercase">Will you attend?</legend>
                {[
                    ['attending', 'Attending'],
                    ['declined', 'Unable to attend'],
                ].map(([value, label]) => (
                    <label key={value} className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="attendance_status"
                            value={value}
                            checked={form.data.attendance_status === value}
                            onChange={() => form.setData('attendance_status', value as 'attending' | 'declined')}
                        />
                        <span>{label}</span>
                    </label>
                ))}
                <InputError message={form.errors.attendance_status} />
            </fieldset>

            {form.data.attendance_status === 'attending' && (
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="attendee_count" className="text-sm">
                            Number of guests attending
                        </label>
                        <input
                            id="attendee_count"
                            type="number"
                            min={1}
                            max={invitation.maxPax}
                            disabled={closed}
                            value={form.data.attendee_count}
                            onChange={(event) => setCount(Number(event.target.value))}
                            aria-invalid={form.errors.attendee_count ? true : undefined}
                            className="h-11 w-28 border border-champagne/60 bg-paper px-3"
                        />
                        <p className="text-sm text-taupe">Up to {invitation.maxPax} {invitation.maxPax === 1 ? 'guest' : 'guests'}.</p>
                        <InputError message={form.errors.attendee_count} />
                    </div>

                    {invitation.collectGuestNames && (
                        <fieldset className="space-y-3" disabled={closed}>
                            <legend className="text-sm">Names of attending guests</legend>
                            {form.data.guests.map((guest, index) => (
                                <div key={index} className="grid gap-2 sm:grid-cols-2">
                                    <input
                                        aria-label={`Guest ${index + 1} name`}
                                        value={guest.name}
                                        onChange={(event) => {
                                            const guests = [...form.data.guests];
                                            guests[index] = { ...guest, name: event.target.value };
                                            form.setData('guests', guests);
                                        }}
                                        className="h-11 border border-champagne/60 bg-paper px-3"
                                        placeholder={`Guest ${index + 1}`}
                                    />
                                    <input
                                        aria-label={`Guest ${index + 1} dietary note`}
                                        value={guest.dietary_requirement}
                                        onChange={(event) => {
                                            const guests = [...form.data.guests];
                                            guests[index] = { ...guest, dietary_requirement: event.target.value };
                                            form.setData('guests', guests);
                                        }}
                                        className="h-11 border border-champagne/60 bg-paper px-3"
                                        placeholder="Dietary note, optional"
                                    />
                                </div>
                            ))}
                            <InputError message={form.errors.guests} />
                        </fieldset>
                    )}

                    {events.length > 1 && (
                        <fieldset className="space-y-2" disabled={closed}>
                            <legend className="text-sm">Events you will attend</legend>
                            {events.map((event) => (
                                <label key={event.id} className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={form.data.event_ids.includes(event.id)}
                                        onChange={(input) => {
                                            const ids = input.target.checked
                                                ? [...form.data.event_ids, event.id]
                                                : form.data.event_ids.filter((id) => id !== event.id);
                                            form.setData('event_ids', ids);
                                        }}
                                    />
                                    <span>{event.name}</span>
                                </label>
                            ))}
                            <InputError message={form.errors.event_ids} />
                        </fieldset>
                    )}

                    <label className="block space-y-2 text-sm">
                        Dietary requirements
                        <textarea
                            value={form.data.dietary_requirements}
                            disabled={closed}
                            onChange={(event) => form.setData('dietary_requirements', event.target.value)}
                            className="min-h-24 w-full border border-champagne/60 bg-paper px-3 py-2"
                        />
                        <InputError message={form.errors.dietary_requirements} />
                    </label>
                </div>
            )}

            <label className="block space-y-2 text-sm">
                Message to the couple
                <textarea
                    value={form.data.message_to_couple}
                    disabled={closed}
                    onChange={(event) => form.setData('message_to_couple', event.target.value)}
                    className="min-h-28 w-full border border-champagne/60 bg-paper px-3 py-2"
                />
                <InputError message={form.errors.message_to_couple} />
            </label>

            <button
                type="submit"
                disabled={closed || form.processing}
                className="h-12 bg-sage px-8 text-sm tracking-[0.16em] text-paper uppercase disabled:opacity-50"
            >
                {form.processing ? 'Saving…' : existing ? 'Update RSVP' : 'Submit RSVP'}
            </button>
        </form>
    );
}

function normalizeGuests(existing: GuestRsvp | null, count: number): Guest[] {
    const guests = existing?.guests.map((guest) => ({
        name: guest.name,
        dietary_requirement: guest.dietaryRequirement ?? '',
    })) ?? [];

    return resize(guests, count);
}

function resize(guests: Guest[], count: number): Guest[] {
    const next = guests.slice(0, count);

    while (next.length < count) {
        next.push({ name: '', dietary_requirement: '' });
    }

    return next;
}
