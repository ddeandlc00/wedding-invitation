<?php

use Database\Seeders\WeddingContentSeeder;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        if (app()->runningUnitTests()) {
            return;
        }

        (new WeddingContentSeeder)->publishStoryAndVenue();
    }

    public function down(): void
    {
        //
    }
};
