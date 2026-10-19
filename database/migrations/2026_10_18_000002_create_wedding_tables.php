<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wedding_settings', function (Blueprint $table) {
            $table->id();
            $table->string('partner_one_name')->default('');
            $table->string('partner_two_name')->default('');
            $table->string('wedding_at', 19)->nullable();
            $table->string('timezone')->default('UTC');
            $table->text('welcome_message');
            $table->text('invitation_message');
            $table->timestamp('rsvp_deadline')->nullable();
            $table->boolean('rsvp_enabled')->default(true);
            $table->boolean('allow_rsvp_edits')->default(true);
            $table->string('dress_code')->nullable();
            $table->text('suggested_arrival')->nullable();
            $table->text('parking_information')->nullable();
            $table->text('transportation_guidance')->nullable();
            $table->text('gift_preferences')->nullable();
            $table->string('registry_url', 500)->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone', 40)->nullable();
            $table->text('contact_note')->nullable();
            $table->text('post_wedding_message');
            $table->string('hero_image_path')->nullable();
            $table->json('theme');
            $table->timestamps();
        });

        Schema::create('wedding_events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('starts_at', 19)->nullable();
            $table->string('ends_at', 19)->nullable();
            $table->string('venue_name')->nullable();
            $table->string('address')->nullable();
            $table->string('map_url', 500)->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_sample')->default(false);
            $table->timestamps();
        });

        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->string('invitee_name');
            $table->string('contact_name')->nullable();
            $table->string('email')->nullable();
            $table->string('contact_information')->nullable();
            $table->char('code_lookup', 64)->unique();
            $table->text('code_encrypted');
            $table->unsignedSmallInteger('max_pax');
            $table->string('status')->default('active')->index();
            $table->text('personal_message')->nullable();
            $table->text('organizer_notes')->nullable();
            $table->timestamp('rsvp_deadline')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('collect_guest_names')->default(false);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index('invitee_name');
        });

        Schema::create('rsvps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('attendance_status')->index();
            $table->unsignedSmallInteger('attendee_count');
            $table->text('dietary_requirements')->nullable();
            $table->text('message_to_couple')->nullable();
            $table->string('source');
            $table->timestamp('submitted_at')->nullable()->index();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('rsvp_guests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rsvp_id')->constrained()->cascadeOnDelete();
            $table->string('guest_name');
            $table->string('dietary_requirement')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('rsvp_wedding_event', function (Blueprint $table) {
            $table->foreignId('rsvp_id')->constrained()->cascadeOnDelete();
            $table->foreignId('wedding_event_id')->constrained()->cascadeOnDelete();
            $table->primary(['rsvp_id', 'wedding_event_id']);
        });

        Schema::create('story_moments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('occurred_label')->nullable();
            $table->text('body');
            $table->string('image_path')->nullable();
            $table->string('caption')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_sample')->default(false);
            $table->timestamps();
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_sample')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->string('alt_text');
            $table->string('caption')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('action')->index();
            $table->string('subject_type')->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->json('metadata')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamp('created_at')->useCurrent()->index();

            $table->index(['subject_type', 'subject_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('gallery_images');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('story_moments');
        Schema::dropIfExists('rsvp_wedding_event');
        Schema::dropIfExists('rsvp_guests');
        Schema::dropIfExists('rsvps');
        Schema::dropIfExists('invitations');
        Schema::dropIfExists('wedding_events');
        Schema::dropIfExists('wedding_settings');
    }
};
