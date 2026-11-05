<?php

use App\Models\WeddingSetting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (! DB::getSchemaBuilder()->hasTable('wedding_settings')) {
            return;
        }

        DB::table('wedding_settings')->update([
            'theme' => json_encode(WeddingSetting::defaultTheme()),
        ]);
    }

    public function down(): void
    {
        //
    }
};
