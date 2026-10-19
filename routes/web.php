<?php

use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InvitationController;
use App\Http\Controllers\Admin\RsvpController;
use App\Http\Controllers\Admin\WeddingSettingsController;
use App\Http\Controllers\InvitationAccessController;
use App\Http\Controllers\InvitationPageController;
use App\Http\Controllers\PublicSiteController;
use App\Http\Controllers\RsvpSubmissionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicSiteController::class, 'home'])->name('home');
Route::get('/our-story', [PublicSiteController::class, 'story'])->name('story');
Route::get('/wedding-details', [PublicSiteController::class, 'details'])->name('details');
Route::get('/itinerary', [PublicSiteController::class, 'details'])->name('itinerary');
Route::get('/faq', [PublicSiteController::class, 'faq'])->name('faq');
Route::get('/gallery', [PublicSiteController::class, 'gallery'])->name('gallery');
Route::get('/contact', [PublicSiteController::class, 'contact'])->name('contact');
Route::get('/registry', [PublicSiteController::class, 'registry'])->name('registry');

Route::post('/invitation/access', [InvitationAccessController::class, 'store'])
    ->middleware('throttle:invitation-codes')
    ->name('invitation.access');

Route::get('/invitation/{code}', [InvitationAccessController::class, 'enter'])
    ->middleware('throttle:invitation-codes')
    ->where('code', '[A-Za-z0-9\-]+')
    ->name('invitation.enter');

Route::middleware('invitation')->group(function () {
    Route::get('/invitation', [InvitationPageController::class, 'show'])->name('invitation.show');
    Route::post('/invitation/rsvp', [RsvpSubmissionController::class, 'store'])
        ->middleware('throttle:10,1')
        ->name('invitation.rsvp.store');
    Route::post('/invitation/leave', [InvitationAccessController::class, 'leave'])->name('invitation.leave');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('invitations/export', [InvitationController::class, 'export'])->name('admin.invitations.export');
    Route::get('invitations', [InvitationController::class, 'index'])->name('admin.invitations.index');
    Route::get('invitations/create', [InvitationController::class, 'create'])->name('admin.invitations.create');
    Route::post('invitations', [InvitationController::class, 'store'])->name('admin.invitations.store');
    Route::get('invitations/{invitation}', [InvitationController::class, 'show'])->name('admin.invitations.show');
    Route::get('invitations/{invitation}/edit', [InvitationController::class, 'edit'])->name('admin.invitations.edit');
    Route::put('invitations/{invitation}', [InvitationController::class, 'update'])->name('admin.invitations.update');
    Route::patch('invitations/{invitation}/status', [InvitationController::class, 'updateStatus'])->name('admin.invitations.status');
    Route::post('invitations/{invitation}/regenerate', [InvitationController::class, 'regenerate'])->name('admin.invitations.regenerate');
    Route::post('invitations/{invitation}/email', [InvitationController::class, 'email'])->name('admin.invitations.email');
    Route::post('invitations/{invitation}/preview', [InvitationController::class, 'preview'])->name('admin.invitations.preview');

    Route::get('rsvps/export', [RsvpController::class, 'export'])->name('admin.rsvps.export');
    Route::get('rsvps', [RsvpController::class, 'index'])->name('admin.rsvps.index');
    Route::get('rsvps/{invitation}', [RsvpController::class, 'show'])->name('admin.rsvps.show');
    Route::put('rsvps/{invitation}', [RsvpController::class, 'update'])->name('admin.rsvps.update');

    Route::get('settings', [WeddingSettingsController::class, 'edit'])->name('admin.settings.edit');
    Route::put('settings', [WeddingSettingsController::class, 'update'])->name('admin.settings.update');

    Route::post('events', [ContentController::class, 'storeEvent'])->name('admin.events.store');
    Route::put('events/{weddingEvent}', [ContentController::class, 'updateEvent'])->name('admin.events.update');
    Route::delete('events/{weddingEvent}', [ContentController::class, 'destroyEvent'])->name('admin.events.destroy');

    Route::post('story', [ContentController::class, 'storeMoment'])->name('admin.story.store');
    Route::put('story/{storyMoment}', [ContentController::class, 'updateMoment'])->name('admin.story.update');
    Route::delete('story/{storyMoment}', [ContentController::class, 'destroyMoment'])->name('admin.story.destroy');

    Route::post('faqs', [ContentController::class, 'storeFaq'])->name('admin.faqs.store');
    Route::put('faqs/{faq}', [ContentController::class, 'updateFaq'])->name('admin.faqs.update');
    Route::delete('faqs/{faq}', [ContentController::class, 'destroyFaq'])->name('admin.faqs.destroy');

    Route::post('gallery', [ContentController::class, 'storeImage'])->name('admin.gallery.store');
    Route::delete('gallery/{galleryImage}', [ContentController::class, 'destroyImage'])->name('admin.gallery.destroy');
});

require __DIR__.'/settings.php';
