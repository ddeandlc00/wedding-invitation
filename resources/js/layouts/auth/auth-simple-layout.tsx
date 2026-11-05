import { Link } from '@inertiajs/react';
import { Monogram } from '@/components/wedding/monogram';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div
            className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#f2e8da] p-6 text-[#3c4034] md:p-10"
            style={{
                ['--foreground' as string]: '#3c4034',
                ['--muted-foreground' as string]: '#6a655c',
                ['--primary' as string]: '#afa1d8',
                ['--primary-foreground' as string]: '#3c4034',
                ['--card' as string]: '#fbf6ef',
                ['--border' as string]: '#d6d4d8',
                ['--input' as string]: '#d6d4d8',
                ['--ring' as string]: '#afa1d8',
            }}
        >
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <Monogram className="mb-1 h-20 w-20" />
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
