<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (! DB::getSchemaBuilder()->hasTable('wedding_settings')) {
            return;
        }

        DB::table('wedding_settings')
            ->where(function ($query): void {
                $query->whereNull('timezone')->orWhere('timezone', 'UTC');
            })
            ->update(['timezone' => 'Asia/Manila']);
    }

    public function down(): void
    {
        //
    }
};
