import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ContentController::storeEvent
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
export const storeEvent = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeEvent.url(options),
    method: 'post',
})

storeEvent.definition = {
    methods: ["post"],
    url: '/admin/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::storeEvent
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
storeEvent.url = (options?: RouteQueryOptions) => {
    return storeEvent.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::storeEvent
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
storeEvent.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeEvent.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::storeEvent
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
    const storeEventForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeEvent.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::storeEvent
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
        storeEventForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeEvent.url(options),
            method: 'post',
        })
    
    storeEvent.form = storeEventForm
/**
* @see \App\Http\Controllers\Admin\ContentController::updateEvent
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
export const updateEvent = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEvent.url(args, options),
    method: 'put',
})

updateEvent.definition = {
    methods: ["put"],
    url: '/admin/events/{weddingEvent}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::updateEvent
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
updateEvent.url = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { weddingEvent: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { weddingEvent: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    weddingEvent: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        weddingEvent: typeof args.weddingEvent === 'object'
                ? args.weddingEvent.id
                : args.weddingEvent,
                }

    return updateEvent.definition.url
            .replace('{weddingEvent}', parsedArgs.weddingEvent.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::updateEvent
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
updateEvent.put = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEvent.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::updateEvent
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
    const updateEventForm = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateEvent.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::updateEvent
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
        updateEventForm.put = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateEvent.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateEvent.form = updateEventForm
/**
* @see \App\Http\Controllers\Admin\ContentController::destroyEvent
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
export const destroyEvent = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyEvent.url(args, options),
    method: 'delete',
})

destroyEvent.definition = {
    methods: ["delete"],
    url: '/admin/events/{weddingEvent}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::destroyEvent
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
destroyEvent.url = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { weddingEvent: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { weddingEvent: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    weddingEvent: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        weddingEvent: typeof args.weddingEvent === 'object'
                ? args.weddingEvent.id
                : args.weddingEvent,
                }

    return destroyEvent.definition.url
            .replace('{weddingEvent}', parsedArgs.weddingEvent.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::destroyEvent
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
destroyEvent.delete = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyEvent.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::destroyEvent
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
    const destroyEventForm = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyEvent.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::destroyEvent
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
        destroyEventForm.delete = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyEvent.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyEvent.form = destroyEventForm
/**
* @see \App\Http\Controllers\Admin\ContentController::storeMoment
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
export const storeMoment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMoment.url(options),
    method: 'post',
})

storeMoment.definition = {
    methods: ["post"],
    url: '/admin/story',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::storeMoment
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
storeMoment.url = (options?: RouteQueryOptions) => {
    return storeMoment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::storeMoment
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
storeMoment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMoment.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::storeMoment
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
    const storeMomentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeMoment.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::storeMoment
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
        storeMomentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeMoment.url(options),
            method: 'post',
        })
    
    storeMoment.form = storeMomentForm
/**
* @see \App\Http\Controllers\Admin\ContentController::updateMoment
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
export const updateMoment = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMoment.url(args, options),
    method: 'put',
})

updateMoment.definition = {
    methods: ["put"],
    url: '/admin/story/{storyMoment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::updateMoment
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
updateMoment.url = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { storyMoment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { storyMoment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    storyMoment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        storyMoment: typeof args.storyMoment === 'object'
                ? args.storyMoment.id
                : args.storyMoment,
                }

    return updateMoment.definition.url
            .replace('{storyMoment}', parsedArgs.storyMoment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::updateMoment
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
updateMoment.put = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMoment.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::updateMoment
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
    const updateMomentForm = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateMoment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::updateMoment
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
        updateMomentForm.put = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateMoment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateMoment.form = updateMomentForm
/**
* @see \App\Http\Controllers\Admin\ContentController::destroyMoment
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
export const destroyMoment = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyMoment.url(args, options),
    method: 'delete',
})

destroyMoment.definition = {
    methods: ["delete"],
    url: '/admin/story/{storyMoment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::destroyMoment
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
destroyMoment.url = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { storyMoment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { storyMoment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    storyMoment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        storyMoment: typeof args.storyMoment === 'object'
                ? args.storyMoment.id
                : args.storyMoment,
                }

    return destroyMoment.definition.url
            .replace('{storyMoment}', parsedArgs.storyMoment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::destroyMoment
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
destroyMoment.delete = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyMoment.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::destroyMoment
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
    const destroyMomentForm = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyMoment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::destroyMoment
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
        destroyMomentForm.delete = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyMoment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyMoment.form = destroyMomentForm
const ContentController = { storeEvent, updateEvent, destroyEvent, storeMoment, updateMoment, destroyMoment }

export default ContentController