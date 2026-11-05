import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/story',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContentController::store
 * @see app/Http/Controllers/Admin/ContentController.php:47
 * @route '/admin/story'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ContentController::update
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
export const update = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/story/{storyMoment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::update
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
update.url = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{storyMoment}', parsedArgs.storyMoment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::update
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
update.put = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::update
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
    const updateForm = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Admin/ContentController.php:56
 * @route '/admin/story/{storyMoment}'
 */
        updateForm.put = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
export const destroy = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/story/{storyMoment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
destroy.url = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{storyMoment}', parsedArgs.storyMoment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
destroy.delete = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ContentController::destroy
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
    const destroyForm = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Admin/ContentController.php:65
 * @route '/admin/story/{storyMoment}'
 */
        destroyForm.delete = (args: { storyMoment: number | { id: number } } | [storyMoment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const story = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default story