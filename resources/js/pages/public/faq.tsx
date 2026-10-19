import { Head } from '@inertiajs/react';
import { useState } from 'react';

type Faq = { id: number; question: string; answer: string; isSample: boolean };

export default function FaqPage({ faqs, hasSample }: { faqs: Faq[]; hasSample: boolean }) {
    const [open, setOpen] = useState<number | null>(faqs[0]?.id ?? null);

    return (
        <>
            <Head title="Questions" />
            <article className="mx-auto max-w-3xl px-5 py-16">
                <h1 className="wedding-display text-6xl">Questions</h1>
                {hasSample && (
                    <p className="mt-6 border border-champagne/50 bg-paper px-4 py-3 text-sm">
                        Sample questions — replace them in the administrator settings.
                    </p>
                )}
                {faqs.length === 0 ? (
                    <p className="mt-10 text-taupe">Questions for guests will appear here.</p>
                ) : (
                    <div className="mt-10 divide-y divide-champagne/40 border-y border-champagne/40">
                        {faqs.map((faq) => {
                            const expanded = open === faq.id;

                            return (
                                <div key={faq.id}>
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between py-4 text-left"
                                        aria-expanded={expanded}
                                        onClick={() => setOpen(expanded ? null : faq.id)}
                                    >
                                        <span className="text-lg">{faq.question}</span>
                                        <span aria-hidden="true">{expanded ? '–' : '+'}</span>
                                    </button>
                                    {expanded && <p className="pb-5 leading-relaxed whitespace-pre-line">{faq.answer}</p>}
                                </div>
                            );
                        })}
                    </div>
                )}
            </article>
        </>
    );
}
