import { Head, Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { Countdown } from '@/components/wedding/countdown';
import { InvitationCodeForm } from '@/components/wedding/invitation-code-form';
import { useWedding } from '@/components/wedding/site-chrome';

export default function Home() {
    const wedding = useWedding();
    const reduce = useReducedMotion();

    return (
        <>
            <Head title="Welcome" />
            <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-xs tracking-[0.28em] text-champagne uppercase">You are invited</p>
                    <h1 className="wedding-display mt-4 text-6xl leading-none sm:text-7xl lg:text-8xl">
                        {wedding.namesConfigured ? wedding.couple : 'Our Wedding'}
                    </h1>
                    {!wedding.namesConfigured && (
                        <p className="mt-4 text-sm text-taupe">The couple’s names will appear here once they are added.</p>
                    )}
                    <div className="mt-6 h-px w-24 bg-champagne" />
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/90">{wedding.welcomeMessage}</p>
                    <p className="mt-6 text-sm tracking-wide text-taupe">
                        {wedding.dateLabel ?? 'Date to be announced'}
                        {wedding.timeLabel ? ` · ${wedding.timeLabel}` : ''}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 text-sm">
                        <Link href="/our-story" className="border-b border-champagne pb-1">
                            Read our story
                        </Link>
                        <Link href="/wedding-details" className="border-b border-champagne pb-1">
                            Wedding details
                        </Link>
                    </div>
                </motion.div>
                <div className="border border-champagne/50 bg-paper p-6 shadow-sm sm:p-8">
                    <h2 className="wedding-display text-4xl">Your invitation</h2>
                    <p className="mt-3 text-sm leading-relaxed text-taupe">
                        Enter the private code from your hosts. A valid code opens only your invitation.
                    </p>
                    <div className="mt-6">
                        <InvitationCodeForm />
                    </div>
                </div>
            </section>
            <section className="border-y border-champagne/30 bg-paper/50">
                <div className="mx-auto max-w-4xl px-5 py-14">
                    <h2 className="wedding-display mb-8 text-center text-4xl">Until the celebration</h2>
                    <Countdown countdown={wedding.countdown} />
                </div>
            </section>
        </>
    );
}
