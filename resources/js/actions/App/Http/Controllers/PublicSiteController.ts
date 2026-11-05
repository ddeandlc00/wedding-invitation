import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicSiteController::home
 * @see app/Http/Controllers/PublicSiteController.php:11
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicSiteController::home
 * @see app/Http/Controllers/PublicSiteController.php:11
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicSiteController::home
 * @see app/Http/Controllers/PublicSiteController.php:11
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicSiteController::home
 * @see app/Http/Controllers/PublicSiteController.php:11
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicSiteController::home
 * @see app/Http/Controllers/PublicSiteController.php:11
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicSiteController::home
 * @see app/Http/Controllers/PublicSiteController.php:11
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicSiteController::home
 * @see app/Http/Controllers/PublicSiteController.php:11
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\PublicSiteController::story
 * @see app/Http/Controllers/PublicSiteController.php:21
 * @route '/our-story'
 */
export const story = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: story.url(options),
    method: 'get',
})

story.definition = {
    methods: ["get","head"],
    url: '/our-story',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicSiteController::story
 * @see app/Http/Controllers/PublicSiteController.php:21
 * @route '/our-story'
 */
story.url = (options?: RouteQueryOptions) => {
    return story.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicSiteController::story
 * @see app/Http/Controllers/PublicSiteController.php:21
 * @route '/our-story'
 */
story.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: story.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicSiteController::story
 * @see app/Http/Controllers/PublicSiteController.php:21
 * @route '/our-story'
 */
story.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: story.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicSiteController::story
 * @see app/Http/Controllers/PublicSiteController.php:21
 * @route '/our-story'
 */
    const storyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: story.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicSiteController::story
 * @see app/Http/Controllers/PublicSiteController.php:21
 * @route '/our-story'
 */
        storyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: story.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicSiteController::story
 * @see app/Http/Controllers/PublicSiteController.php:21
 * @route '/our-story'
 */
        storyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: story.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    story.form = storyForm
/**
* @see \App\Http\Controllers\PublicSiteController::details
 * @see app/Http/Controllers/PublicSiteController.php:26
 * @route '/wedding-details'
 */
export const details = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(options),
    method: 'get',
})

details.definition = {
    methods: ["get","head"],
    url: '/wedding-details',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicSiteController::details
 * @see app/Http/Controllers/PublicSiteController.php:26
 * @route '/wedding-details'
 */
details.url = (options?: RouteQueryOptions) => {
    return details.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicSiteController::details
 * @see app/Http/Controllers/PublicSiteController.php:26
 * @route '/wedding-details'
 */
details.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicSiteController::details
 * @see app/Http/Controllers/PublicSiteController.php:26
 * @route '/wedding-details'
 */
details.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: details.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicSiteController::details
 * @see app/Http/Controllers/PublicSiteController.php:26
 * @route '/wedding-details'
 */
    const detailsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: details.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicSiteController::details
 * @see app/Http/Controllers/PublicSiteController.php:26
 * @route '/wedding-details'
 */
        detailsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: details.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicSiteController::details
 * @see app/Http/Controllers/PublicSiteController.php:26
 * @route '/wedding-details'
 */
        detailsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: details.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    details.form = detailsForm
/**
* @see \App\Http\Controllers\PublicSiteController::contact
 * @see app/Http/Controllers/PublicSiteController.php:31
 * @route '/contact'
 */
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicSiteController::contact
 * @see app/Http/Controllers/PublicSiteController.php:31
 * @route '/contact'
 */
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicSiteController::contact
 * @see app/Http/Controllers/PublicSiteController.php:31
 * @route '/contact'
 */
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicSiteController::contact
 * @see app/Http/Controllers/PublicSiteController.php:31
 * @route '/contact'
 */
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicSiteController::contact
 * @see app/Http/Controllers/PublicSiteController.php:31
 * @route '/contact'
 */
    const contactForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: contact.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicSiteController::contact
 * @see app/Http/Controllers/PublicSiteController.php:31
 * @route '/contact'
 */
        contactForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicSiteController::contact
 * @see app/Http/Controllers/PublicSiteController.php:31
 * @route '/contact'
 */
        contactForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    contact.form = contactForm
const PublicSiteController = { home, story, details, contact }

export default PublicSiteController