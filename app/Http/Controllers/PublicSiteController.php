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

    public function contact(WeddingPresenter $presenter): Response
    {
        return Inertia::render('public/contact', $presenter->contact());
    }
}
