import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { WeddingShared } from '@/types/wedding';

export function useWedding(): WeddingShared {
    return usePage<{ wedding: WeddingShared }>().props.wedding;
}

export function SiteHeader() {
    const wedding = useWedding();
    const [open, setOpen] = useState(false);
    const current = usePage().url;

    return (
        <header className="border-b border-champagne/40">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
                <Link href="/" className="group flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full border border-champagne/70 text-sm tracking-[0.2em] text-sage">
                        {wedding.monogram}
                    </span>
                    <span>
                        <span className="wedding-display block text-xl leading-none text-ink">
                            {wedding.couple}
                        </span>
                        <span className="mt-1 block text-xs tracking-[0.18em] text-taupe uppercase">
                            {wedding.dateLabel ?? 'Wedding celebration'}
                        </span>
                    </span>
                </Link>
                <nav className="hidden items-center gap-6 lg:flex" aria-label="Wedding pages">
                    {wedding.navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm tracking-wide ${current.startsWith(item.href) ? 'text-sage' : 'text-taupe hover:text-ink'}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <button
                    type="button"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-champagne/70 lg:hidden"
                    aria-expanded={open}
                    aria-controls="wedding-menu"
                    onClick={() => setOpen((value) => !value)}
                >
                    <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </div>
            {open && (
                <nav id="wedding-menu" className="border-t border-champagne/30 px-5 py-4 lg:hidden" aria-label="Wedding pages">
                    <ul className="space-y-1">
                        {wedding.navigation.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="block rounded-md px-2 py-3 text-lg"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}

export function SiteFooter() {
    const wedding = useWedding();

    return (
        <footer className="border-t border-champagne/40">
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
                <div>
                    <p className="wedding-display text-3xl">{wedding.couple}</p>
                    <p className="mt-2 text-sm text-taupe">
                        {wedding.dateLabel ?? 'The date will be announced here.'}
                        {wedding.timeLabel ? ` · ${wedding.timeLabel}` : ''}
                    </p>
                </div>
                <div>
                    <p className="text-xs tracking-[0.18em] text-taupe uppercase">Visit</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        {wedding.navigation.slice(0, 4).map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="hover:text-sage">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-sm text-taupe">
                    <p>Invitations are personal. Guest lists and RSVPs are never shown on public pages.</p>
                    {(wedding.contactEmail || wedding.contactPhone) && (
                        <p className="mt-3">
                            {wedding.contactEmail}
                            {wedding.contactEmail && wedding.contactPhone ? ' · ' : ''}
                            {wedding.contactPhone}
                        </p>
                    )}
                </div>
            </div>
        </footer>
    );
}
