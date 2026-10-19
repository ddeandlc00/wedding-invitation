<?php

namespace App\Http\Requests\Admin;

use App\Enums\InvitationStatus;
use App\Models\WeddingSetting;
use App\Services\InvitationService;
use Illuminate\Validation\Rule;

class StoreInvitationRequest extends AdminFormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return $this->invitationRules();
    }

    /**
     * @return array<string, mixed>
     */
    protected function invitationRules(): array
    {
        return [
            'invitee_name' => ['required', 'string', 'max:160'],
            'contact_name' => ['nullable', 'string', 'max:160'],
            'email' => ['nullable', 'email', 'max:255'],
            'contact_information' => ['nullable', 'string', 'max:500'],
            'max_pax' => ['required', 'integer', 'min:1', 'max:50'],
            'status' => ['required', Rule::enum(InvitationStatus::class)],
            'personal_message' => ['nullable', 'string', 'max:2000'],
            'organizer_notes' => ['nullable', 'string', 'max:5000'],
            'rsvp_deadline' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date'],
            'collect_guest_names' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function invitationAttributes(): array
    {
        $timezone = WeddingSetting::current()->timezone;

        return [
            'invitee_name' => trim($this->string('invitee_name')->toString()),
            'contact_name' => $this->blank('contact_name'),
            'email' => $this->blank('email'),
            'contact_information' => $this->blank('contact_information'),
            'max_pax' => $this->integer('max_pax'),
            'status' => $this->string('status')->toString(),
            'personal_message' => $this->blank('personal_message'),
            'organizer_notes' => $this->blank('organizer_notes'),
            'rsvp_deadline' => app(InvitationService::class)->nullableDate($this->input('rsvp_deadline'), $timezone),
            'expires_at' => app(InvitationService::class)->nullableDate($this->input('expires_at'), $timezone),
            'collect_guest_names' => $this->boolean('collect_guest_names'),
        ];
    }
}
