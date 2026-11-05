import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:20
 * @route '/admin/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ContentController::update
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
export const update = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/events/{weddingEvent}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::update
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
update.url = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{weddingEvent}', parsedArgs.weddingEvent.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::update
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
update.put = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::update
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
    const updateForm = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::update
 * @see app/Http/Controllers/Admin/ContentController.php:29
 * @route '/admin/events/{weddingEvent}'
 */
        updateForm.put = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
export const destroy = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/events/{weddingEvent}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
destroy.url = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{weddingEvent}', parsedArgs.weddingEvent.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
destroy.delete = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::destroy
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
    const destroyForm = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::destroy
 * @see app/Http/Controllers/Admin/ContentController.php:38
 * @route '/admin/events/{weddingEvent}'
 */
        destroyForm.delete = (args: { weddingEvent: number | { id: number } } | [weddingEvent: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const events = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default events