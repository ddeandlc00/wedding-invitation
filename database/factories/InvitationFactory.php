<?php

namespace Database\Factories;

use App\Enums\InvitationStatus;
use App\Models\Invitation;
use App\Services\InvitationCodeService;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Crypt;

/**
 * @extends Factory<Invitation>
 */
class InvitationFactory extends Factory
{
    protected $model = Invitation::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $codes = app(InvitationCodeService::class);
        $plain = $codes->generatePlainCode();

        return [
            'invitee_name' => fake()->name(),
            'contact_name' => null,
            'email' => null,
            'contact_information' => null,
            'code_lookup' => $codes->hash($plain),
            'code_encrypted' => Crypt::encryptString($plain),
            'max_pax' => 2,
            'status' => InvitationStatus::Active,
            'personal_message' => null,
            'organizer_notes' => null,
            'rsvp_deadline' => null,
            'expires_at' => null,
            'collect_guest_names' => false,
            'created_by' => null,
        ];
    }

    public function disabled(): static
    {
        return $this->state(fn (): array => [
            'status' => InvitationStatus::Disabled,
        ]);
    }

    public function collectingNames(): static
    {
        return $this->state(fn (): array => [
            'collect_guest_names' => true,
        ]);
    }
}
