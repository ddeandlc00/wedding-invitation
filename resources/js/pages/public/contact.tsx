import { Head } from '@inertiajs/react';

export default function Contact({
    email,
    phone,
    note,
}: {
    email: string | null;
    phone: string | null;
    note: string | null;
}) {
    const empty = !email && !phone && !note;

    return (
        <>
            <Head title="Contact" />
            <article className="mx-auto max-w-3xl px-5 py-16">
                <h1 className="wedding-display text-6xl">Contact</h1>
                {empty ? (
                    <p className="mt-8 text-taupe">Contact details will appear here when the couple adds them.</p>
                ) : (
                    <div className="mt-8 space-y-4 text-lg">
                        {note && <p className="whitespace-pre-line">{note}</p>}
                        {email && (
                            <p>
                                <a className="underline" href={`mailto:${email}`}>
                                    {email}
                                </a>
                            </p>
                        )}
                        {phone && <p>{phone}</p>}
                    </div>
                )}
            </article>
        </>
    );
}
