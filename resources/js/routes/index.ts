import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/admin/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/admin/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/admin/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/admin/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/admin/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/admin/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/admin/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/admin/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/admin/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/admin/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/admin/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/admin/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/admin/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/admin/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
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
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm