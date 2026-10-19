import { Head, router, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

type Settings = {
    partnerOne: string;
    partnerTwo: string;
    weddingAt: string | null;
    timezone: string;
    timezones: string[];
    welcomeMessage: string;
    invitationMessage: string;
    rsvpDeadline: string | null;
    rsvpEnabled: boolean;
    allowRsvpEdits: boolean;
    dressCode: string;
    suggestedArrival: string;
    parking: string;
    transportation: string;
    giftPreferences: string;
    registryUrl: string;
    contactEmail: string;
    contactPhone: string;
    contactNote: string;
    postWeddingMessage: string;
    heroUrl: string | null;
    theme: Record<string, string>;
    headingFonts: string[];
    bodyFonts: string[];
};

type EventRow = {
    id: number;
    name: string;
    description: string;
    startsAt: string | null;
    endsAt: string | null;
    venueName: string;
    address: string;
    mapUrl: string;
    sortOrder: number;
    isSample: boolean;
};

type Moment = {
    id: number;
    title: string;
    occurredLabel: string;
    body: string;
    caption: string;
    sortOrder: number;
    isSample: boolean;
};

type Faq = {
    id: number;
    question: string;
    answer: string;
    sortOrder: number;
    isSample: boolean;
    isPublished: boolean;
};

type GalleryImage = { id: number; url: string | null; altText: string; caption: string | null };

export default function SettingsPage({
    settings,
    events,
    moments,
    faqs,
    gallery,
}: {
    settings: Settings;
    events: EventRow[];
    moments: Moment[];
    faqs: Faq[];
    gallery: GalleryImage[];
}) {
    const form = useForm({
        partner_one_name: settings.partnerOne,
        partner_two_name: settings.partnerTwo,
        wedding_at: settings.weddingAt ?? '',
        timezone: settings.timezone,
        welcome_message: settings.welcomeMessage,
        invitation_message: settings.invitationMessage,
        rsvp_deadline: settings.rsvpDeadline ?? '',
        rsvp_enabled: settings.rsvpEnabled,
        allow_rsvp_edits: settings.allowRsvpEdits,
        dress_code: settings.dressCode,
        suggested_arrival: settings.suggestedArrival,
        parking_information: settings.parking,
        transportation_guidance: settings.transportation,
        gift_preferences: settings.giftPreferences,
        registry_url: settings.registryUrl,
        contact_email: settings.contactEmail,
        contact_phone: settings.contactPhone,
        contact_note: settings.contactNote,
        post_wedding_message: settings.postWeddingMessage,
        remove_hero: false,
        hero_image: null as File | null,
        theme: settings.theme,
    });

    return (
        <>
            <Head title="Wedding settings" />
            <div className="mx-auto flex max-w-4xl flex-col gap-10 p-4 md:p-6">
                <form
                    className="space-y-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.put('/admin/settings', { forceFormData: true, preserveScroll: true });
                    }}
                >
                    <h1 className="font-serif text-3xl">Wedding settings</h1>
                    <p className="text-sm text-muted-foreground">Times you enter are in the wedding time zone, including across daylight saving changes.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Text label="Partner one" value={form.data.partner_one_name} onChange={(value) => form.setData('partner_one_name', value)} error={form.errors.partner_one_name} />
                        <Text label="Partner two" value={form.data.partner_two_name} onChange={(value) => form.setData('partner_two_name', value)} error={form.errors.partner_two_name} />
                        <Text label="Wedding date and time" type="datetime-local" value={form.data.wedding_at} onChange={(value) => form.setData('wedding_at', value)} error={form.errors.wedding_at} />
                        <label className="text-sm">
                            Time zone
                            <input className="mt-1 h-10 w-full rounded-md border px-3" list="zones" value={form.data.timezone} onChange={(event) => form.setData('timezone', event.target.value)} />
                            <datalist id="zones">
                                {settings.timezones.map((zone) => <option key={zone} value={zone} />)}
                            </datalist>
                            <InputError message={form.errors.timezone} />
                        </label>
                    </div>
                    <Area label="Welcome message" value={form.data.welcome_message} onChange={(value) => form.setData('welcome_message', value)} error={form.errors.welcome_message} />
                    <Area label="Default invitation message" value={form.data.invitation_message} onChange={(value) => form.setData('invitation_message', value)} error={form.errors.invitation_message} />
                    <Text label="RSVP deadline" type="datetime-local" value={form.data.rsvp_deadline} onChange={(value) => form.setData('rsvp_deadline', value)} error={form.errors.rsvp_deadline} />
                    <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.data.rsvp_enabled} onChange={(event) => form.setData('rsvp_enabled', event.target.checked)} /> RSVPs are open</label>
                    <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.data.allow_rsvp_edits} onChange={(event) => form.setData('allow_rsvp_edits', event.target.checked)} /> Guests may revise an RSVP</label>
                    <Text label="Dress code" value={form.data.dress_code} onChange={(value) => form.setData('dress_code', value)} />
                    <Area label="Suggested arrival" value={form.data.suggested_arrival} onChange={(value) => form.setData('suggested_arrival', value)} />
                    <Area label="Parking" value={form.data.parking_information} onChange={(value) => form.setData('parking_information', value)} />
                    <Area label="Transportation" value={form.data.transportation_guidance} onChange={(value) => form.setData('transportation_guidance', value)} />
                    <Area label="Gift note" value={form.data.gift_preferences} onChange={(value) => form.setData('gift_preferences', value)} />
                    <Text label="Registry URL" value={form.data.registry_url} onChange={(value) => form.setData('registry_url', value)} error={form.errors.registry_url} />
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Text label="Contact email" value={form.data.contact_email} onChange={(value) => form.setData('contact_email', value)} error={form.errors.contact_email} />
                        <Text label="Contact phone" value={form.data.contact_phone} onChange={(value) => form.setData('contact_phone', value)} error={form.errors.contact_phone} />
                    </div>
                    <Area label="Contact note" value={form.data.contact_note} onChange={(value) => form.setData('contact_note', value)} />
                    <Area label="Message after the wedding" value={form.data.post_wedding_message} onChange={(value) => form.setData('post_wedding_message', value)} error={form.errors.post_wedding_message} />
                    <div className="grid gap-3 sm:grid-cols-3">
                        {(['ivory', 'paper', 'ink', 'muted', 'champagne', 'sage'] as const).map((key) => (
                            <label key={key} className="text-sm capitalize">
                                {key}
                                <input type="color" className="mt-1 h-10 w-full" value={form.data.theme[key]} onChange={(event) => form.setData('theme', { ...form.data.theme, [key]: event.target.value })} />
                            </label>
                        ))}
                    </div>
                    <InputError message={form.errors['theme.ink']} />
                    <div className="grid gap-3 sm:grid-cols-2">
                        <label className="text-sm">
                            Heading font
                            <select className="mt-1 h-10 w-full rounded-md border px-2" value={form.data.theme.heading_font} onChange={(event) => form.setData('theme', { ...form.data.theme, heading_font: event.target.value })}>
                                {settings.headingFonts.map((font) => <option key={font}>{font}</option>)}
                            </select>
                        </label>
                        <label className="text-sm">
                            Body font
                            <select className="mt-1 h-10 w-full rounded-md border px-2" value={form.data.theme.body_font} onChange={(event) => form.setData('theme', { ...form.data.theme, body_font: event.target.value })}>
                                {settings.bodyFonts.map((font) => <option key={font}>{font}</option>)}
                            </select>
                        </label>
                    </div>
                    {settings.heroUrl && <img src={settings.heroUrl} alt="Current hero photograph" className="max-h-48" />}
                    <label className="text-sm">
                        Hero photograph
                        <input type="file" accept="image/jpeg,image/png,image/webp" className="mt-1 block" onChange={(event) => form.setData('hero_image', event.target.files?.[0] ?? null)} />
                        <InputError message={form.errors.hero_image} />
                    </label>
                    <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.data.remove_hero} onChange={(event) => form.setData('remove_hero', event.target.checked)} /> Remove hero photograph</label>
                    <Button type="submit" disabled={form.processing}>{form.processing ? 'Saving…' : 'Save settings'}</Button>
                </form>

                <ContentSection title="Events">
                    {events.map((event) => (
                        <MiniForm
                            key={event.id}
                            action={`/admin/events/${event.id}`}
                            method="put"
                            fields={{
                                name: event.name,
                                description: event.description,
                                starts_at: event.startsAt ?? '',
                                ends_at: event.endsAt ?? '',
                                venue_name: event.venueName,
                                address: event.address,
                                map_url: event.mapUrl,
                                sort_order: String(event.sortOrder),
                            }}
                            onDelete={() => router.delete(`/admin/events/${event.id}`, { preserveScroll: true })}
                        />
                    ))}
                    <MiniForm action="/admin/events" method="post" fields={{ name: '', description: '', starts_at: '', ends_at: '', venue_name: '', address: '', map_url: '', sort_order: '0' }} />
                </ContentSection>

                <ContentSection title="Story">
                    {moments.map((moment) => (
                        <MiniForm
                            key={moment.id}
                            action={`/admin/story/${moment.id}`}
                            method="put"
                            fields={{ title: moment.title, occurred_label: moment.occurredLabel, body: moment.body, caption: moment.caption, sort_order: String(moment.sortOrder) }}
                            onDelete={() => router.delete(`/admin/story/${moment.id}`, { preserveScroll: true })}
                        />
                    ))}
                    <MiniForm action="/admin/story" method="post" fields={{ title: '', occurred_label: '', body: '', caption: '', sort_order: '0' }} />
                </ContentSection>

                <ContentSection title="Questions">
                    {faqs.map((faq) => (
                        <MiniForm key={faq.id} action={`/admin/faqs/${faq.id}`} method="put" fields={{ question: faq.question, answer: faq.answer, sort_order: String(faq.sortOrder) }} onDelete={() => router.delete(`/admin/faqs/${faq.id}`, { preserveScroll: true })} />
                    ))}
                    <MiniForm action="/admin/faqs" method="post" fields={{ question: '', answer: '', sort_order: '0' }} />
                </ContentSection>

                <ContentSection title="Gallery">
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {gallery.map((image) => (
                            <li key={image.id} className="rounded-xl border p-3 text-sm">
                                {image.url && <img src={image.url} alt={image.altText} className="mb-2 max-h-40 w-full object-cover" />}
                                <p>{image.altText}</p>
                                <button type="button" className="mt-2 underline" onClick={() => router.delete(`/admin/gallery/${image.id}`, { preserveScroll: true })}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <GalleryUpload />
                </ContentSection>
            </div>
        </>
    );
}

function Text({ label, value, onChange, error, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; error?: string; type?: string }) {
    return (
        <label className="block text-sm">
            {label}
            <input type={type} className="mt-1 h-10 w-full rounded-md border px-3" value={value} onChange={(event) => onChange(event.target.value)} />
            <InputError message={error} />
        </label>
    );
}

function Area({ label, value, onChange, error }: { label: string; value: string; onChange: (value: string) => void; error?: string }) {
    return (
        <label className="block text-sm">
            {label}
            <textarea className="mt-1 min-h-24 w-full rounded-md border px-3 py-2" value={value} onChange={(event) => onChange(event.target.value)} />
            <InputError message={error} />
        </label>
    );
}

function ContentSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="space-y-4">
            <h2 className="font-serif text-2xl">{title}</h2>
            {children}
        </section>
    );
}

function MiniForm({
    action,
    method,
    fields,
    onDelete,
}: {
    action: string;
    method: 'post' | 'put';
    fields: Record<string, string>;
    onDelete?: () => void;
}) {
    const form = useForm(fields);

    return (
        <form
            className="grid gap-2 rounded-xl border p-3"
            onSubmit={(event) => {
                event.preventDefault();
                if (method === 'put') {
                    form.put(action, { preserveScroll: true });
                } else {
                    form.post(action, { preserveScroll: true, onSuccess: () => form.reset() });
                }
            }}
        >
            {Object.keys(fields).map((key) => (
                <label key={key} className="text-xs">
                    {key.replaceAll('_', ' ')}
                    {key === 'body' || key === 'description' || key === 'answer' ? (
                        <textarea className="mt-1 min-h-20 w-full rounded-md border px-2 py-1 text-sm" value={form.data[key]} onChange={(event) => form.setData(key, event.target.value)} />
                    ) : (
                        <input className="mt-1 h-9 w-full rounded-md border px-2 text-sm" type={key.endsWith('_at') ? 'datetime-local' : 'text'} value={form.data[key]} onChange={(event) => form.setData(key, event.target.value)} />
                    )}
                </label>
            ))}
            <div className="flex gap-2">
                <Button type="submit" size="sm" disabled={form.processing}>Save</Button>
                {onDelete && <Button type="button" size="sm" variant="outline" onClick={onDelete}>Remove</Button>}
            </div>
        </form>
    );
}

function GalleryUpload() {
    const form = useForm({ image: null as File | null, alt_text: '', caption: '', sort_order: '0' });

    return (
        <form
            className="grid gap-2 rounded-xl border p-3"
            onSubmit={(event) => {
                event.preventDefault();
                form.post('/admin/gallery', { forceFormData: true, preserveScroll: true, onSuccess: () => form.reset() });
            }}
        >
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => form.setData('image', event.target.files?.[0] ?? null)} />
            <input className="h-9 rounded-md border px-2" placeholder="Alternative text" value={form.data.alt_text} onChange={(event) => form.setData('alt_text', event.target.value)} />
            <input className="h-9 rounded-md border px-2" placeholder="Caption" value={form.data.caption} onChange={(event) => form.setData('caption', event.target.value)} />
            <InputError message={form.errors.image || form.errors.alt_text} />
            <Button type="submit" size="sm" disabled={form.processing}>Add photograph</Button>
        </form>
    );
}

SettingsPage.layout = {
    breadcrumbs: [{ title: 'Settings', href: '/admin/settings' }],
};
