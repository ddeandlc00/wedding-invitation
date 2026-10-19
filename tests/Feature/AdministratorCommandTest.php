<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdministratorCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_admin_command_creates_a_verified_administrator(): void
    {
        $this->artisan('wedding:admin', [
            '--name' => 'Wedding Organizer',
            '--email' => 'organizer@example.com',
            '--password' => 'a-long-password',
        ])->assertSuccessful();

        $user = User::query()->where('email', 'organizer@example.com')->first();
        $this->assertNotNull($user);
        $this->assertTrue($user->isAdmin());
        $this->assertNotNull($user->email_verified_at);
        $this->assertTrue(Hash::check('a-long-password', $user->password));

        $this->post(route('login.store'), [
            'email' => 'organizer@example.com',
            'password' => 'a-long-password',
        ])->assertRedirect(route('dashboard', absolute: false));
    }
}
