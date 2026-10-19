import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import type { AdminInvitation } from '@/types/wedding';

type EventOption = { id: number; name: string };

export default function RsvpShow({
    invitation,
    events,
}: {
    invitation: AdminInvitation;
    events: EventOption[];
}) {
    const existing = invitation.rsvp;
    const form = useForm({
        attendance_status: existing?.attendanceStatus ?? 'attending',
        attendee_count: existing?.attendanceStatus === 'declined' ? 0 : (existing?.attendeeCount ?? 1),
        dietary_requirements: existing?.dietaryRequirements ?? '',
        message_to_couple: existing?.messageToCouple ?? '',
        guests: existing?.guests.map((guest) => ({
            name: guest.name,
            dietary_requirement: guest.dietaryRequirement ?? '',
        })) ?? [{ name: '', dietary_requirement: '' }],
        event_ids: existing?.eventIds ?? [],
    });

    return (
        <>
            <Head title={`${invitation.inviteeName} RSVP`} />
            <form
                className="mx-auto flex max-w-3xl flex-col gap-5 p-4 md:p-6"
                onSubmit={(event) => {
                    event.preventDefault();
                    form.put(`/admin/rsvps/${invitation.id}`);
                }}
            >
                <div>
                    <h1 className="font-serif text-3xl">{invitation.inviteeName}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Allowed guests: {invitation.maxPax}. A response saved here is marked as entered by the organizer.
                    </p>
                </div>
                <label className="text-sm">
                    Attendance
                    <select className="mt-1 h-10 w-full rounded-md border px-3" value={form.data.attendance_status} onChange={(event) => form.setData('attendance_status', event.target.value as 'attending' | 'declined')}>
                        <option value="attending">Attending</option>
                        <option value="declined">Unable to attend</option>
                    </select>
                    <InputError message={form.errors.attendance_status} />
                </label>
                {form.data.attendance_status === 'attending' && (
                    <>
                        <label className="text-sm">
                            Attendee count
                            <input type="number" min={1} max={invitation.maxPax} className="mt-1 h-10 w-full rounded-md border px-3" value={form.data.attendee_count} onChange={(event) => form.setData('attendee_count', Number(event.target.value))} />
                            <InputError message={form.errors.attendee_count} />
                        </label>
                        {invitation.collectGuestNames && (
                            <div className="space-y-2">
                                {form.data.guests.map((guest, index) => (
                                    <input
                                        key={index}
                                        className="h-10 w-full rounded-md border px-3"
                                        placeholder={`Guest ${index + 1}`}
                                        value={guest.name}
                                        onChange={(event) => {
                                            const guests = [...form.data.guests];
                                            guests[index] = { ...guest, name: event.target.value };
                                            form.setData('guests', guests);
                                        }}
                                    />
                                ))}
                                <Button type="button" variant="outline" onClick={() => form.setData('guests', [...form.data.guests, { name: '', dietary_requirement: '' }])}>
                                    Add name
                                </Button>
                                <InputError message={form.errors.guests} />
                            </div>
                        )}
                        {events.length > 0 && (
                            <fieldset className="space-y-2 text-sm">
                                <legend>Events</legend>
                                {events.map((event) => (
                                    <label key={event.id} className="flex gap-2">
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
                                        {event.name}
                                    </label>
                                ))}
                            </fieldset>
                        )}
                    </>
                )}
                <label className="text-sm">
                    Dietary requirements
                    <textarea className="mt-1 min-h-20 w-full rounded-md border px-3 py-2" value={form.data.dietary_requirements} onChange={(event) => form.setData('dietary_requirements', event.target.value)} />
                </label>
                <label className="text-sm">
                    Message
                    <textarea className="mt-1 min-h-20 w-full rounded-md border px-3 py-2" value={form.data.message_to_couple} onChange={(event) => form.setData('message_to_couple', event.target.value)} />
                </label>
                <Button type="submit" disabled={form.processing}>{form.processing ? 'Saving…' : 'Save RSVP'}</Button>
            </form>
        </>
    );
}

RsvpShow.layout = {
    breadcrumbs: [
        { title: 'RSVPs', href: '/admin/rsvps' },
        { title: 'Record', href: '/admin/rsvps' },
    ],
};
