import { Head, Link, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import type { AdminInvitation } from '@/types/wedding';

export default function InvitationForm({ invitation }: { invitation: AdminInvitation | null }) {
    const form = useForm({
        invitee_name: invitation?.inviteeName ?? '',
        contact_name: invitation?.contactName ?? '',
        email: invitation?.email ?? '',
        contact_information: invitation?.contactInformation ?? '',
        max_pax: invitation?.maxPax ?? 1,
        status: invitation?.status ?? 'active',
        personal_message: invitation?.personalMessage ?? '',
        organizer_notes: invitation?.organizerNotes ?? '',
        rsvp_deadline: invitation?.rsvpDeadline ?? '',
        expires_at: invitation?.expiresAt ?? '',
        collect_guest_names: invitation?.collectGuestNames ?? false,
    });

    return (
        <>
            <Head title={invitation ? 'Edit invitation' : 'New invitation'} />
            <form
                className="mx-auto flex max-w-3xl flex-col gap-5 p-4 md:p-6"
                onSubmit={(event) => {
                    event.preventDefault();
                    if (invitation) {
                        form.put(`/admin/invitations/${invitation.id}`);
                    } else {
                        form.post('/admin/invitations');
                    }
                }}
            >
                <div>
                    <h1 className="font-serif text-3xl">{invitation ? 'Edit invitation' : 'New invitation'}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">A private code is created for you. It is not based on the guest’s name.</p>
                </div>
                <Field label="Invitee or household name" error={form.errors.invitee_name}>
                    <input className="h-10 w-full rounded-md border px-3" value={form.data.invitee_name} onChange={(event) => form.setData('invitee_name', event.target.value)} required />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Contact name" error={form.errors.contact_name}>
                        <input className="h-10 w-full rounded-md border px-3" value={form.data.contact_name} onChange={(event) => form.setData('contact_name', event.target.value)} />
                    </Field>
                    <Field label="Email" error={form.errors.email}>
                        <input type="email" className="h-10 w-full rounded-md border px-3" value={form.data.email} onChange={(event) => form.setData('email', event.target.value)} />
                    </Field>
                </div>
                <Field label="Other contact information" error={form.errors.contact_information}>
                    <input className="h-10 w-full rounded-md border px-3" value={form.data.contact_information} onChange={(event) => form.setData('contact_information', event.target.value)} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Guests allowed (pax)" error={form.errors.max_pax}>
                        <input type="number" min={1} max={50} className="h-10 w-full rounded-md border px-3" value={form.data.max_pax} onChange={(event) => form.setData('max_pax', Number(event.target.value))} />
                    </Field>
                    <Field label="Status" error={form.errors.status}>
                        <select className="h-10 w-full rounded-md border px-3" value={form.data.status} onChange={(event) => form.setData('status', event.target.value as 'active' | 'disabled')}>
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </Field>
                </div>
                <Field label="Personal message" error={form.errors.personal_message}>
                    <textarea className="min-h-28 w-full rounded-md border px-3 py-2" value={form.data.personal_message} onChange={(event) => form.setData('personal_message', event.target.value)} />
                </Field>
                <Field label="Organizer notes" error={form.errors.organizer_notes}>
                    <textarea className="min-h-24 w-full rounded-md border px-3 py-2" value={form.data.organizer_notes} onChange={(event) => form.setData('organizer_notes', event.target.value)} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="RSVP deadline override" error={form.errors.rsvp_deadline}>
                        <input type="datetime-local" className="h-10 w-full rounded-md border px-3" value={form.data.rsvp_deadline} onChange={(event) => form.setData('rsvp_deadline', event.target.value)} />
                    </Field>
                    <Field label="Invitation expires" error={form.errors.expires_at}>
                        <input type="datetime-local" className="h-10 w-full rounded-md border px-3" value={form.data.expires_at} onChange={(event) => form.setData('expires_at', event.target.value)} />
                    </Field>
                </div>
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.data.collect_guest_names} onChange={(event) => form.setData('collect_guest_names', event.target.checked)} />
                    Collect the name of each attending guest
                </label>
                <div className="flex gap-3">
                    <Button type="submit" disabled={form.processing}>{form.processing ? 'Saving…' : 'Save invitation'}</Button>
                    <Link href="/admin/invitations" className="inline-flex h-9 items-center px-3 text-sm">Cancel</Link>
                </div>
            </form>
        </>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <label className="block text-sm">
            {label}
            <div className="mt-1">{children}</div>
            <InputError message={error} />
        </label>
    );
}

InvitationForm.layout = {
    breadcrumbs: [
        { title: 'Invitations', href: '/admin/invitations' },
        { title: 'Invitation', href: '/admin/invitations/create' },
    ],
};
