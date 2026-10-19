<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\Invitation;
use App\Models\User;
use App\Services\InvitationCodeService;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvitationManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_an_administrator_can_create_an_invitation_with_a_unique_code(): void
    {
        $admin = User::factory()->create();

        $response = $this->actingAs($admin)->post(route('admin.invitations.store'), [
            'invitee_name' => 'The Santos Family',
            'max_pax' => 3,
            'status' => 'active',
            'collect_guest_names' => true,
        ]);

        $invitation = Invitation::query()->first();
        $this->assertNotNull($invitation);
        $response->assertRedirect(route('admin.invitations.show', $invitation));

        $plain = $invitation->plainCode();
        $this->assertNotNull($plain);
        $this->assertNotSame($plain, $invitation->code_lookup);
        $this->assertSame(app(InvitationCodeService::class)->hash($plain), $invitation->code_lookup);
        $this->assertDatabaseHas('audit_logs', ['action' => 'invitation.created']);

        $this->actingAs($admin)
            ->get(route('admin.invitations.show', $invitation))
            ->assertOk()
            ->assertSee($plain, false);
    }

    public function test_duplicate_invitation_codes_cannot_be_stored(): void
    {
        $first = Invitation::factory()->create();

        $this->expectException(UniqueConstraintViolationException::class);

        Invitation::factory()->create([
            'code_lookup' => $first->code_lookup,
        ]);
    }

    public function test_an_administrator_can_edit_an_invitation(): void
    {
        $admin = User::factory()->create();
        $invitation = Invitation::factory()->create(['invitee_name' => 'Original Name', 'max_pax' => 2]);

        $this->actingAs($admin)->put(route('admin.invitations.update', $invitation), [
            'invitee_name' => 'Updated Household',
            'max_pax' => 4,
            'status' => 'active',
        ])->assertRedirect(route('admin.invitations.show', $invitation));

        $this->assertSame('Updated Household', $invitation->fresh()->invitee_name);
        $this->assertSame(4, $invitation->fresh()->max_pax);
    }

    public function test_disabled_invitations_cannot_be_used(): void
    {
        [$invitation, $code] = invitationWithCode(['status' => 'disabled']);

        $this->post(route('invitation.access'), ['code' => $code])
            ->assertRedirect(route('home'))
            ->assertSessionHasErrors('code');

        $this->get(route('invitation.show'))->assertRedirect(route('home'));
        $this->assertNotNull($invitation->id);
    }

    public function test_unauthorized_users_cannot_manage_invitations(): void
    {
        $invitation = Invitation::factory()->create();

        $this->get(route('admin.invitations.index'))->assertRedirect(route('login'));
        $this->post(route('admin.invitations.store'), [
            'invitee_name' => 'Nope',
            'max_pax' => 1,
            'status' => 'active',
        ])->assertRedirect(route('login'));

        $guest = User::factory()->guest()->create();

        $this->actingAs($guest)->get(route('admin.invitations.index'))->assertForbidden();
        $this->actingAs($guest)->get(route('admin.invitations.show', $invitation))->assertForbidden();
        $this->assertSame(0, AuditLog::query()->count());
    }
}
