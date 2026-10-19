<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CreateAdministrator extends Command
{
    protected $signature = 'wedding:admin {--name=} {--email=} {--password=}';

    protected $description = 'Create a verified wedding administrator';

    public function handle(): int
    {
        $name = $this->option('name');
        $email = $this->option('email');
        $password = $this->option('password');

        if (! is_string($name) || $name === '') {
            $name = $this->ask('Administrator name');
        }

        if (! is_string($email) || $email === '') {
            $email = $this->ask('Administrator email');
        }

        $generated = false;

        if (! is_string($password) || $password === '') {
            $password = Str::password(20);
            $generated = true;
        }

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ], [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:12'],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return self::FAILURE;
        }

        $user = User::query()->create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'role' => 'admin',
        ]);
        $user->forceFill(['email_verified_at' => now()])->save();

        $this->info('Administrator created.');

        if ($generated) {
            $this->line('Password (shown once): '.$password);
        }

        return self::SUCCESS;
    }
}
