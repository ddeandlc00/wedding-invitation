<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateWeddingSettingsRequest extends AdminFormRequest
{
    protected function prepareForValidation(): void
    {
        if (! $this->hasFile('hero_image')) {
            $this->merge(['hero_image' => null]);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'partner_one_name' => ['nullable', 'string', 'max:80'],
            'partner_two_name' => ['nullable', 'string', 'max:80'],
            'wedding_at' => ['nullable', 'date'],
            'timezone' => ['required', 'timezone'],
            'welcome_message' => ['required', 'string', 'max:2000'],
            'invitation_message' => ['required', 'string', 'max:2000'],
            'rsvp_deadline' => ['nullable', 'date'],
            'rsvp_enabled' => ['sometimes', 'boolean'],
            'allow_rsvp_edits' => ['sometimes', 'boolean'],
            'dress_code' => ['nullable', 'string', 'max:160'],
            'suggested_arrival' => ['nullable', 'string', 'max:500'],
            'parking_information' => ['nullable', 'string', 'max:2000'],
            'transportation_guidance' => ['nullable', 'string', 'max:2000'],
            'gift_preferences' => ['nullable', 'string', 'max:2000'],
            'registry_url' => ['nullable', 'url', 'max:500', 'regex:/^https?:\/\//i'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'regex:/^[0-9+\-\s().]{3,40}$/'],
            'contact_note' => ['nullable', 'string', 'max:2000'],
            'post_wedding_message' => ['required', 'string', 'max:500'],
            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'remove_hero' => ['sometimes', 'boolean'],
            'theme.ivory' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'theme.paper' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'theme.ink' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'theme.muted' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'theme.champagne' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'theme.sage' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'theme.heading_font' => ['required', Rule::in(['Cormorant Garamond', 'Georgia'])],
            'theme.body_font' => ['required', Rule::in(['Outfit', 'Instrument Sans', 'Georgia'])],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $ivory = $this->string('theme.ivory')->toString();
            $ink = $this->string('theme.ink')->toString();

            if ($this->luminance($ivory) < $this->luminance($ink) + 0.25) {
                $validator->errors()->add('theme.ink', 'Choose a darker ink color and a lighter ivory background so text stays readable.');
            }
        });
    }

    private function luminance(string $hex): float
    {
        $hex = ltrim($hex, '#');

        if (strlen($hex) !== 6) {
            return 0;
        }

        $red = hexdec(substr($hex, 0, 2)) / 255;
        $green = hexdec(substr($hex, 2, 2)) / 255;
        $blue = hexdec(substr($hex, 4, 2)) / 255;

        return (0.2126 * $red) + (0.7152 * $green) + (0.0722 * $blue);
    }
}
