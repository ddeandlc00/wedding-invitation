import { Head, Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { Countdown } from '@/components/wedding/countdown';
import { InvitationCodeForm } from '@/components/wedding/invitation-code-form';
import { Monogram } from '@/components/wedding/monogram';
import { useWedding } from '@/components/wedding/site-chrome';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
    const wedding = useWedding();
    const reduce = useReducedMotion();

    return (
        <>
            <Head title="Welcome" />
            <section className="mx-auto max-w-6xl px-5 pt-8 sm:pt-10">
                <figure className="overflow-hidden border border-champagne/50 bg-paper">
                    <img
                        src="/images/couple-hero.jpg"
                        alt={`${wedding.namesConfigured ? wedding.couple : 'The couple'}, a placeholder portrait until their photograph is added.`}
                        className="aspect-[16/10] w-full object-cover object-[center_30%] sm:aspect-[16/8]"
                    />
                </figure>
            </section>
            <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <Monogram className="mb-4 h-28 w-28 sm:h-36 sm:w-36" />
                    <p className="text-xs tracking-[0.28em] text-taupe uppercase">You are invited</p>
                    <h1 className="wedding-display mt-4 text-5xl leading-none sm:text-7xl lg:text-8xl">
                        {wedding.namesConfigured ? wedding.couple : 'Our Wedding'}
                    </h1>
                    {!wedding.namesConfigured && (
                        <p className="mt-4 text-sm text-taupe">The couple’s names will appear here once they are added.</p>
                    )}
                    <div className="mt-6 h-px w-24 bg-champagne" />
                    <p className="mt-6 max-w-xl text-lg leading-relaxed">{wedding.welcomeMessage}</p>
                    <p className="mt-6 text-sm tracking-wide text-taupe">
                        {wedding.dateLabel ?? 'Date to be announced'}
                        {wedding.timeLabel ? ` · ${wedding.timeLabel}` : ''}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild variant="outline" className="rounded-full border-champagne">
                            <Link href="/our-story">Read our story</Link>
                        </Button>
                        <Button asChild className="rounded-full">
                            <Link href="/wedding-details">Wedding details</Link>
                        </Button>
                    </div>
                </motion.div>
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <Card className="relative z-10 border-champagne bg-paper shadow-xl shadow-[#d6d4d8]/40">
                        <CardHeader>
                            <CardTitle className="wedding-display text-4xl font-medium">Your invitation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-6 text-sm leading-relaxed text-taupe">
                                Enter the private code from your hosts. A valid code opens only your invitation.
                            </p>
                            <InvitationCodeForm />
                        </CardContent>
                    </Card>
                </motion.div>
            </section>
            <section className="border-y border-champagne/40 bg-paper/60">
                <div className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
                    <h2 className="wedding-display mb-8 text-center text-4xl sm:text-5xl">Until the celebration</h2>
                    <Countdown countdown={wedding.countdown} />
                </div>
            </section>
        </>
    );
}
