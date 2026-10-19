export type WeddingTheme = {
    ivory: string;
    paper: string;
    ink: string;
    muted: string;
    champagne: string;
    sage: string;
    heading_font: string;
    body_font: string;
    headingStack: string;
    bodyStack: string;
};

export type CountdownPayload = {
    target: string | null;
    passed: boolean;
    scheduled: boolean;
    postMessage: string;
    timezone: string;
};

export type WeddingNavItem = {
    label: string;
    href: string;
};

export type WeddingShared = {
    couple: string;
    monogram: string;
    partnerOne: string;
    partnerTwo: string;
    namesConfigured: boolean;
    welcomeMessage: string;
    dateLabel: string | null;
    timeLabel: string | null;
    timezone: string;
    theme: WeddingTheme;
    countdown: CountdownPayload;
    heroUrl: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    navigation: WeddingNavItem[];
};

export type PublicEvent = {
    id: number;
    name: string;
    description: string | null;
    dateLabel: string | null;
    timeLabel: string | null;
    endTimeLabel: string | null;
    venueName: string | null;
    address: string | null;
    mapUrl: string | null;
    isSample: boolean;
    sortOrder: number;
};

export type GuestRsvp = {
    attendanceStatus: 'attending' | 'declined';
    statusLabel: string;
    attendeeCount: number;
    guests: { name: string; dietaryRequirement: string | null }[];
    eventIds: number[];
    dietaryRequirements: string | null;
    messageToCouple: string | null;
    submittedAt: string | null;
    updatedAt: string | null;
    source: 'guest' | 'organizer';
    sourceLabel: string;
};

export type GuestInvitation = {
    inviteeName: string;
    greeting: string;
    message: string;
    maxPax: number;
    allowanceLabel: string;
    collectGuestNames: boolean;
    rsvpOpen: boolean;
    rsvpClosedMessage: string | null;
    deadlineLabel: string | null;
    rsvp: GuestRsvp | null;
    statusLabel: string;
};

export type AdminInvitation = {
    id: number;
    inviteeName: string;
    contactName: string | null;
    email: string | null;
    contactInformation: string | null;
    maxPax: number;
    status: 'active' | 'disabled';
    statusLabel: string;
    personalMessage: string | null;
    organizerNotes: string | null;
    collectGuestNames: boolean;
    rsvpDeadline: string | null;
    expiresAt: string | null;
    code: string | null;
    url: string | null;
    createdAt: string | null;
    rsvp: GuestRsvp | null;
    statusSummary: string;
    confirmedAttendees: number;
};

export type Paginator<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

export type ChartItem = { label: string; value: number };

export type DashboardStats = {
    invitations: number;
    households: number;
    invitedCapacity: number;
    awaiting: number;
    attending: number;
    declined: number;
    confirmedAttendees: number;
    unconfirmedCapacity: number;
    declinedCapacity: number;
    disabled: number;
    statusChart: ChartItem[];
    capacityChart: ChartItem[];
    trend: { day: string; total: number }[];
    events: { name: string; confirmed: number; when: string | null }[];
};
