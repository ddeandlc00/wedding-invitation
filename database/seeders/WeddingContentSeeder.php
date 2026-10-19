<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\StoryMoment;
use App\Models\WeddingEvent;
use App\Models\WeddingSetting;
use Illuminate\Database\Seeder;

class WeddingContentSeeder extends Seeder
{
    public function run(): void
    {
        WeddingSetting::current();

        if (StoryMoment::query()->doesntExist()) {
            StoryMoment::query()->create([
                'title' => 'Sample milestone',
                'occurred_label' => 'Replace this date',
                'body' => 'This is sample story content. Replace it from Wedding Settings with how you met, a few milestones, and your engagement.',
                'sort_order' => 1,
                'is_sample' => true,
            ]);
        }

        if (WeddingEvent::query()->doesntExist()) {
            WeddingEvent::query()->create([
                'name' => 'Ceremony',
                'description' => 'Sample event. Add the ceremony date, time, venue, and address in Wedding Settings.',
                'sort_order' => 1,
                'is_sample' => true,
            ]);
            WeddingEvent::query()->create([
                'name' => 'Reception',
                'description' => 'Sample event. Add the reception details when you have them.',
                'sort_order' => 2,
                'is_sample' => true,
            ]);
        }

        if (Faq::query()->doesntExist()) {
            Faq::query()->create([
                'question' => 'Is this sample content?',
                'answer' => 'Yes. Replace these questions from the administrator settings page before you share the website.',
                'sort_order' => 1,
                'is_sample' => true,
                'is_published' => true,
            ]);
        }
    }
}
