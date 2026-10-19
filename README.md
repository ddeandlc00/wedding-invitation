# Wedding invitation

A private wedding website. Guests open a personal invitation with a code, then RSVP. The organizer manages invitations, capacity, and responses from an administrator panel.

The public site is a Laravel application. React pages are rendered through Inertia. The production database is Supabase PostgreSQL, reached through Laravel’s normal database connection. The browser never receives the database password or a Supabase service-role key.

## Local development

Requirements:

- PHP 8.3 or newer, with `pdo_sqlite` for tests and `pdo_pgsql` for Supabase
- Composer
- Node.js 22 or newer
- npm

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan storage:link
npm install
npm run dev
```

In another terminal:

```bash
php artisan serve
```

The local `.env` uses SQLite so the site runs without a Supabase project. Automated tests also use an in-memory SQLite database and never touch production.

Create the first organizer. The command refuses passwords shorter than 12 characters. If you omit `--password`, a password is printed once.

```bash
php artisan wedding:admin --name="Your Name" --email="you@example.com" --password="choose-a-long-password"
```

Sign in at `/admin/login`.

Sample story, ceremony, and question rows are optional:

```bash
php artisan db:seed
```

Those rows are labeled as samples in the website. They are not real wedding details.

## Production

Use Supabase PostgreSQL and a Laravel host. Do not point production at the SQLite file.

1. Create a Supabase project.
2. In Project Settings → Database, copy the **direct** connection (host `db.<project-ref>.supabase.co`, port `5432`, database `postgres`, user `postgres`). Prefer this over the transaction pooler. Transaction pooling can break Laravel migrations.
3. Set `DB_SSLMODE=require`.
4. Set `APP_ENV=production`, `APP_DEBUG=false`, and `APP_URL` to the public `https` origin.
5. Set `SESSION_ENCRYPT=true` and `SESSION_SECURE_COOKIE=true`.
6. If the host is behind a proxy, set `TRUSTED_PROXIES=*`.
7. Run `php artisan migrate --force` against that database.
8. Run `php artisan storage:link` if photographs use the local public disk.
9. Create the administrator with `php artisan wedding:admin` on the server. Do not seed a shared password.
10. Build assets with `npm ci && npm run build`.

A `Dockerfile` is included for hosts that run a container (Render, Fly.io, Railway, and similar). The web process is Apache on port 80. Run migrations as a release command, not on every request:

```bash
php artisan migrate --force
php artisan storage:link
```

Set the same environment variables in the host. Do not bake `.env` into the image.

### Supabase and the browser

Laravel connects as the database user and enforces authorization itself. Do not add the Supabase anon or service-role key to JavaScript.

For defense in depth, enable Row Level Security on the application tables and add no policies for the `anon` and `authenticated` roles. The Postgres role Laravel uses bypasses Row Level Security, so the site keeps working, while the public Supabase API cannot read invitations.

### Photographs

Uploads are stored on Laravel’s `public` disk. On hosts with an ephemeral disk, files disappear when the container is replaced. For durable photographs, move the public disk to Supabase Storage’s S3-compatible API and set the `AWS_*` variables in `.env.example`. The S3 Flysystem adapter is not installed until you choose that path.

### Mail

Invitation links can always be copied. Email is sent only when `WEDDING_MAIL_ENABLED=true` and `MAIL_MAILER` is `smtp`, `ses`, `postmark`, `resend`, or `mailgun`. The screen says the message was submitted only after the mailer accepts it. The log mailer is not treated as delivery.

### Free-tier limits

A free web service such as Render’s free instance sleeps after inactivity. The first visit after sleep can take half a minute. Supabase’s free database has size, bandwidth, and backup limits, and a paused project must be restored from the Supabase dashboard. Those limits are acceptable for a small wedding site, but a sleeping app is a poor experience the week of the wedding. A small always-on instance is the more reliable choice if the budget allows. None of that changes RSVP correctness: responses are written to Postgres when the app is awake.

Custom domains are configured at the host and then copied into `APP_URL`.

## Tests

```bash
php artisan test
npm run types:check
npm run build
```

`composer test` also runs Pint and PHPStan.

Do not run `migrate:fresh` or `db:seed` against the production database unless you intend to erase it.

## Invitation codes

Codes are 120-bit random values. The database stores a SHA-256 lookup hash and an encrypted copy so the organizer can copy the link later. The raw code is not a guest’s name, email, or row id.

Opening `/invitation/{code}` checks the code, stores only the invitation id in the session, and replaces the address bar with `/invitation`. Later pages do not include the code. A mistaken code gets the same not-recognized message whether or not some other code exists. Disabled and expired codes, which the holder already possesses, explain why that link will not open.

Regenerating a code invalidates the previous link. Rotating `APP_KEY` makes stored codes unreadable; regenerate those invitations afterward. The lookup hash does not depend on `APP_KEY`, but the copyable code does.

There is no guest account and no guest password.

## What is included

- Landing page, story, schedule, questions, gallery, registry, and contact
- Invitation-code entry and personal invitation pages
- RSVP create and update, with pax limits, deadlines, and optional guest names
- Organizer sign-in, dashboard, invitation management, RSVP management, and wedding settings
- CSV export, copyable links, optional email, and an audit log for sensitive organizer actions
- Countdown in the wedding time zone, including daylight-saving changes

## Limits

- Story photographs are supported in the database and on the public story page. The settings screen edits story text; add gallery and hero photographs from Wedding Settings.
- One current RSVP is stored per invitation.
- The organizer’s manual RSVP is allowed after the guest deadline. Guests are not.
- Charts count saved rows. They are empty until invitations exist.
