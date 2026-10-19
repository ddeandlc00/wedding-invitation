import type { Auth } from '@/types/auth';
import type { WeddingShared } from '@/types/wedding';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            wedding: WeddingShared;
            notice: {
                rsvpConfirmed: boolean;
            };
            [key: string]: unknown;
        };
    }
}
