<?php

namespace App\Http\Controllers;

use App\Services\WeddingPresenter;
use Inertia\Inertia;
use Inertia\Response;

class PublicSiteController extends Controller
{
    public function home(WeddingPresenter $presenter): Response
    {
        return Inertia::render('public/home', [
            'detailsPreview' => [
                'dateLabel' => $presenter->shared()['dateLabel'],
                'timeLabel' => $presenter->shared()['timeLabel'],
            ],
        ]);
    }

    public function story(WeddingPresenter $presenter): Response
    {
        return Inertia::render('public/story', $presenter->story());
    }

    public function details(WeddingPresenter $presenter): Response
    {
        return Inertia::render('public/details', $presenter->details());
    }

    public function faq(WeddingPresenter $presenter): Response
    {
        return Inertia::render('public/faq', $presenter->faqs());
    }

    public function gallery(WeddingPresenter $presenter): Response
    {
        return Inertia::render('public/gallery', $presenter->gallery());
    }

    public function contact(WeddingPresenter $presenter): Response
    {
        return Inertia::render('public/contact', $presenter->contact());
    }

    public function registry(WeddingPresenter $presenter): Response
    {
        $details = $presenter->details();

        return Inertia::render('public/registry', [
            'giftPreferences' => $details['giftPreferences'],
            'registryUrl' => $details['registryUrl'],
        ]);
    }
}
