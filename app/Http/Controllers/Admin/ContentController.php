<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\GalleryImage;
use App\Models\Invitation;
use App\Models\StoryMoment;
use App\Models\WeddingEvent;
use App\Models\WeddingSetting;
use App\Support\PublicMedia;
use App\Support\WeddingClock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function storeEvent(Request $request): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        WeddingEvent::query()->create($this->eventAttributes($request));
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Event added.']);

        return back();
    }

    public function updateEvent(Request $request, WeddingEvent $weddingEvent): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        $weddingEvent->update($this->eventAttributes($request));
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Event updated.']);

        return back();
    }

    public function destroyEvent(WeddingEvent $weddingEvent): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        $weddingEvent->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Event removed.']);

        return back();
    }

    public function storeMoment(Request $request): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        $attributes = $this->momentAttributes($request);
        $file = $request->file('image');

        if ($file !== null) {
            $attributes['image_path'] = PublicMedia::store($file, 'wedding/story');
        }

        StoryMoment::query()->create($attributes);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Story moment added.']);

        return back();
    }

    public function updateMoment(Request $request, StoryMoment $storyMoment): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        $attributes = $this->momentAttributes($request);
        $file = $request->file('image');

        if ($file !== null) {
            PublicMedia::delete($storyMoment->image_path);
            $attributes['image_path'] = PublicMedia::store($file, 'wedding/story');
        }

        if ($request->boolean('remove_image')) {
            PublicMedia::delete($storyMoment->image_path);
            $attributes['image_path'] = null;
        }

        $storyMoment->update($attributes);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Story moment updated.']);

        return back();
    }

    public function destroyMoment(StoryMoment $storyMoment): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        PublicMedia::delete($storyMoment->image_path);
        $storyMoment->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Story moment removed.']);

        return back();
    }

    public function storeFaq(Request $request): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        Faq::query()->create($this->faqAttributes($request));
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Question added.']);

        return back();
    }

    public function updateFaq(Request $request, Faq $faq): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        $faq->update($this->faqAttributes($request));
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Question updated.']);

        return back();
    }

    public function destroyFaq(Faq $faq): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        $faq->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Question removed.']);

        return back();
    }

    public function storeImage(Request $request): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);

        $validated = $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'alt_text' => ['required', 'string', 'max:180'],
            'caption' => ['nullable', 'string', 'max:240'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
        ]);

        $file = $request->file('image');

        if ($file === null) {
            abort(422);
        }

        GalleryImage::query()->create([
            'path' => PublicMedia::store($file, 'wedding/gallery'),
            'alt_text' => $validated['alt_text'],
            'caption' => $this->blank($validated['caption'] ?? null),
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Photograph added.']);

        return back();
    }

    public function destroyImage(GalleryImage $galleryImage): RedirectResponse
    {
        $this->authorize('manage', Invitation::class);
        PublicMedia::delete($galleryImage->path);
        $galleryImage->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Photograph removed.']);

        return back();
    }

    /**
     * @return array<string, mixed>
     */
    private function eventAttributes(Request $request): array
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:2000'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date'],
            'venue_name' => ['nullable', 'string', 'max:160'],
            'address' => ['nullable', 'string', 'max:300'],
            'map_url' => ['nullable', 'url', 'max:500', 'regex:/^https?:\/\//i'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_sample' => ['sometimes', 'boolean'],
        ]);

        $timezone = WeddingSetting::current()->timezone;

        return [
            'name' => $validated['name'],
            'description' => $this->blank($validated['description'] ?? null),
            'starts_at' => WeddingClock::normalizeLocalInput($validated['starts_at'] ?? null, $timezone),
            'ends_at' => WeddingClock::normalizeLocalInput($validated['ends_at'] ?? null, $timezone),
            'venue_name' => $this->blank($validated['venue_name'] ?? null),
            'address' => $this->blank($validated['address'] ?? null),
            'map_url' => $this->blank($validated['map_url'] ?? null),
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
            'is_sample' => $request->boolean('is_sample'),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function momentAttributes(Request $request): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'occurred_label' => ['nullable', 'string', 'max:80'],
            'body' => ['required', 'string', 'max:5000'],
            'caption' => ['nullable', 'string', 'max:240'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_sample' => ['sometimes', 'boolean'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'remove_image' => ['sometimes', 'boolean'],
        ]);

        return [
            'title' => $validated['title'],
            'occurred_label' => $this->blank($validated['occurred_label'] ?? null),
            'body' => $validated['body'],
            'caption' => $this->blank($validated['caption'] ?? null),
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
            'is_sample' => $request->boolean('is_sample'),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function faqAttributes(Request $request): array
    {
        $validated = $request->validate([
            'question' => ['required', 'string', 'max:240'],
            'answer' => ['required', 'string', 'max:5000'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_sample' => ['sometimes', 'boolean'],
            'is_published' => ['sometimes', 'boolean'],
        ]);

        return [
            'question' => $validated['question'],
            'answer' => $validated['answer'],
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
            'is_sample' => $request->boolean('is_sample'),
            'is_published' => $request->boolean('is_published', true),
        ];
    }

    private function blank(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $value = trim($value);

        return $value === '' ? null : $value;
    }
}
