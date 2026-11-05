<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateWeddingSettingsRequest;
use App\Models\Invitation;
use App\Models\WeddingSetting;
use App\Services\InvitationService;
use App\Services\WeddingPresenter;
use App\Support\WeddingClock;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class WeddingSettingsController extends Controller
{
    public function edit(WeddingPresenter $presenter): Response
    {
        $this->authorize('manage', Invitation::class);

        return Inertia::render('admin/settings/index', [
            'settings' => $presenter->settingsForm(),
            'events' => $presenter->adminEvents(),
            'moments' => $presenter->adminMoments(),
        ]);
    }

    public function update(UpdateWeddingSettingsRequest $request, InvitationService $dates): RedirectResponse
    {
        $settings = WeddingSetting::current();
        $timezone = $request->string('timezone')->toString();
        $theme = $request->input('theme');
        $theme = is_array($theme) ? $theme : [];

        $payload = [
            'partner_one_name' => trim($request->string('partner_one_name')->toString()),
            'partner_two_name' => trim($request->string('partner_two_name')->toString()),
            'wedding_at' => WeddingClock::normalizeLocalInput($request->input('wedding_at'), $timezone),
            'timezone' => $timezone,
            'welcome_message' => $request->string('welcome_message')->toString(),
            'invitation_message' => $request->string('invitation_message')->toString(),
            'rsvp_deadline' => $dates->nullableDate($request->input('rsvp_deadline'), $timezone),
            'rsvp_enabled' => $request->boolean('rsvp_enabled'),
            'allow_rsvp_edits' => $request->boolean('allow_rsvp_edits'),
            'dress_code' => $this->blank($request->string('dress_code')->toString()),
            'suggested_arrival' => $this->blank($request->string('suggested_arrival')->toString()),
            'parking_information' => $this->blank($request->string('parking_information')->toString()),
            'transportation_guidance' => $this->blank($request->string('transportation_guidance')->toString()),
            'gift_preferences' => $this->blank($request->string('gift_preferences')->toString()),
            'contact_email' => $this->blank($request->string('contact_email')->toString()),
            'contact_phone' => $this->blank($request->string('contact_phone')->toString()),
            'contact_note' => $this->blank($request->string('contact_note')->toString()),
            'post_wedding_message' => $request->string('post_wedding_message')->toString(),
            'theme' => [
                'ivory' => WeddingSetting::hexColor($theme['ivory'] ?? null, '#f2e8da'),
                'paper' => WeddingSetting::hexColor($theme['paper'] ?? null, '#fbf6ef'),
                'ink' => WeddingSetting::hexColor($theme['ink'] ?? null, '#3c4034'),
                'muted' => WeddingSetting::hexColor($theme['muted'] ?? null, '#6a655c'),
                'champagne' => WeddingSetting::hexColor($theme['champagne'] ?? null, '#d6d4d8'),
                'sage' => WeddingSetting::hexColor($theme['sage'] ?? null, '#afa1d8'),
                'heading_font' => WeddingSetting::allowedFont('heading_font', (string) ($theme['heading_font'] ?? '')),
                'body_font' => WeddingSetting::allowedFont('body_font', (string) ($theme['body_font'] ?? '')),
            ],
        ];

        $settings->update($payload);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Wedding settings saved.']);

        return to_route('admin.settings.edit');
    }

    private function blank(string $value): ?string
    {
        $value = trim($value);

        return $value === '' ? null : $value;
    }
}
