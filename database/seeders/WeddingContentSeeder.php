<?php

namespace Database\Seeders;

use App\Models\StoryMoment;
use App\Models\WeddingEvent;
use App\Models\WeddingSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class WeddingContentSeeder extends Seeder
{
    public function run(): void
    {
        WeddingSetting::current();
        $this->publishStoryAndVenue();
    }

    public function publishStoryAndVenue(): void
    {
        if (! Schema::hasTable('story_moments') || ! Schema::hasTable('wedding_events')) {
            return;
        }

        if (StoryMoment::query()->doesntExist()) {
            foreach ($this->moments() as $moment) {
                StoryMoment::query()->create($moment);
            }
        }

        $this->publishEvents();
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function moments(): array
    {
        return [
            [
                'title' => 'Where it began',
                'occurred_label' => '2021',
                'body' => 'Stephen and Raenah met in 2021. A first hello turned into a long conversation, and the afternoon slipped away before either of them was ready to leave. That ordinary meeting became the beginning of the story they are still writing.',
                'image_path' => 'images/story-2021.jpg',
                'caption' => 'Placeholder photograph',
                'sort_order' => 1,
                'is_sample' => true,
            ],
            [
                'title' => 'Learning each other',
                'occurred_label' => '2022',
                'body' => 'The following year was a study in the small things. They learned each other’s pace, the people who matter, and how to make an ordinary week feel like time well spent. What started as a meeting became a partnership.',
                'image_path' => 'images/story-2022.jpg',
                'caption' => 'Placeholder photograph',
                'sort_order' => 2,
                'is_sample' => true,
            ],
            [
                'title' => 'A life in common',
                'occurred_label' => '2023',
                'body' => 'By 2023 their lives had braided together. Family tables, shared trips, and quiet evenings at home all pointed the same way. They were building one life, side by side.',
                'image_path' => 'images/story-2023-a.jpg|images/story-2023-b.jpg',
                'caption' => 'Placeholder photographs',
                'sort_order' => 3,
                'is_sample' => true,
            ],
            [
                'title' => 'Choosing the same future',
                'occurred_label' => '2024',
                'body' => 'They kept choosing a shared future. Plans grew longer, introductions became familiar, and “we” settled in as the natural way to talk about what came next.',
                'image_path' => null,
                'caption' => null,
                'sort_order' => 4,
                'is_sample' => true,
            ],
            [
                'title' => 'She said yes',
                'occurred_label' => '2025',
                'body' => 'In 2025 Stephen asked Raenah to marry him, and she said yes. The night filled with phone calls, happy tears, and the first talk of a wedding with the sea nearby and the people they love gathered in one place.',
                'image_path' => 'images/story-2025.jpg',
                'caption' => 'Placeholder photograph',
                'sort_order' => 5,
                'is_sample' => true,
            ],
            [
                'title' => 'The day takes shape',
                'occurred_label' => '2026',
                'body' => 'They chose a civil ceremony and a celebration that would stay together from the vows through the last song. Asaricha Tropical Beach Resort in Pasuquin would hold the whole day. Invitations, music, and a guest list slowly gave the date a shape.',
                'image_path' => null,
                'caption' => null,
                'sort_order' => 6,
                'is_sample' => true,
            ],
            [
                'title' => 'By the sea',
                'occurred_label' => '2027',
                'body' => 'On March 6, 2027, at three in the afternoon, Stephen and Raenah will marry at Asaricha Tropical Beach Resort. The ceremony opens the afternoon, and the reception continues in the same place, in the same sea air. They cannot wait to share that day.',
                'image_path' => 'images/couple-hero.jpg',
                'caption' => 'Placeholder photograph',
                'sort_order' => 7,
                'is_sample' => true,
            ],
        ];
    }

    private function publishEvents(): void
    {
        $definitions = $this->events();
        $existing = WeddingEvent::query()->orderBy('sort_order')->orderBy('id')->get();

        if ($existing->isEmpty()) {
            foreach ($definitions as $event) {
                WeddingEvent::query()->create($event);
            }

            return;
        }

        $samples = $existing->filter(fn (WeddingEvent $event): bool => $event->is_sample)->values();

        if ($samples->count() !== $existing->count()) {
            return;
        }

        foreach ($definitions as $index => $event) {
            $row = $samples->get($index);

            if ($row instanceof WeddingEvent) {
                $row->update($event);

                continue;
            }

            WeddingEvent::query()->create($event);
        }

        $samples->slice(count($definitions))->each(function (WeddingEvent $event): void {
            $event->delete();
        });
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function events(): array
    {
        return [
            [
                'name' => 'Ceremony',
                'description' => 'The civil ceremony begins at 3:00 in the afternoon at Asaricha Tropical Beach Resort. Come ready to take your place by the sea.',
                'starts_at' => '2027-03-06 15:00:00',
                'ends_at' => null,
                'venue_name' => 'Asaricha Tropical Beach Resort',
                'address' => 'Brgy. Estancia, Pasuquin, Ilocos Norte, Philippines',
                'map_url' => 'https://maps.app.goo.gl/3W7faTPg12jmqoqD9',
                'sort_order' => 1,
                'is_sample' => false,
            ],
            [
                'name' => 'Reception',
                'description' => 'The reception follows the ceremony at the same resort. Dinner, music, and the rest of the celebration stay at Asaricha Tropical Beach Resort.',
                'starts_at' => null,
                'ends_at' => null,
                'venue_name' => 'Asaricha Tropical Beach Resort',
                'address' => 'Brgy. Estancia, Pasuquin, Ilocos Norte, Philippines',
                'map_url' => 'https://maps.app.goo.gl/3W7faTPg12jmqoqD9',
                'sort_order' => 2,
                'is_sample' => false,
            ],
        ];
    }
}
