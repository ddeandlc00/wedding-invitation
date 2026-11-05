import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\RsvpController::exportMethod
 * @see app/Http/Controllers/Admin/RsvpController.php:69
 * @route '/admin/rsvps/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/rsvps/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\RsvpController::exportMethod
 * @see app/Http/Controllers/Admin/RsvpController.php:69
 * @route '/admin/rsvps/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RsvpController::exportMethod
 * @see app/Http/Controllers/Admin/RsvpController.php:69
 * @route '/admin/rsvps/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\RsvpController::exportMethod
 * @see app/Http/Controllers/Admin/RsvpController.php:69
 * @route '/admin/rsvps/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\RsvpController::exportMethod
 * @see app/Http/Controllers/Admin/RsvpController.php:69
 * @route '/admin/rsvps/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\RsvpController::exportMethod
 * @see app/Http/Controllers/Admin/RsvpController.php:69
 * @route '/admin/rsvps/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\RsvpController::exportMethod
 * @see app/Http/Controllers/Admin/RsvpController.php:69
 * @route '/admin/rsvps/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
/**
* @see \App\Http\Controllers\Admin\RsvpController::index
 * @see app/Http/Controllers/Admin/RsvpController.php:24
 * @route '/admin/rsvps'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/rsvps',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\RsvpController::index
 * @see app/Http/Controllers/Admin/RsvpController.php:24
 * @route '/admin/rsvps'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RsvpController::index
 * @see app/Http/Controllers/Admin/RsvpController.php:24
 * @route '/admin/rsvps'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\RsvpController::index
 * @see app/Http/Controllers/Admin/RsvpController.php:24
 * @route '/admin/rsvps'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\RsvpController::index
 * @see app/Http/Controllers/Admin/RsvpController.php:24
 * @route '/admin/rsvps'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\RsvpController::index
 * @see app/Http/Controllers/Admin/RsvpController.php:24
 * @route '/admin/rsvps'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\RsvpController::index
 * @see app/Http/Controllers/Admin/RsvpController.php:24
 * @route '/admin/rsvps'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\RsvpController::show
 * @see app/Http/Controllers/Admin/RsvpController.php:44
 * @route '/admin/rsvps/{invitation}'
 */
export const show = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/rsvps/{invitation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\RsvpController::show
 * @see app/Http/Controllers/Admin/RsvpController.php:44
 * @route '/admin/rsvps/{invitation}'
 */
show.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { invitation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    invitation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invitation: typeof args.invitation === 'object'
                ? args.invitation.id
                : args.invitation,
                }

    return show.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RsvpController::show
 * @see app/Http/Controllers/Admin/RsvpController.php:44
 * @route '/admin/rsvps/{invitation}'
 */
show.get = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\RsvpController::show
 * @see app/Http/Controllers/Admin/RsvpController.php:44
 * @route '/admin/rsvps/{invitation}'
 */
show.head = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\RsvpController::show
 * @see app/Http/Controllers/Admin/RsvpController.php:44
 * @route '/admin/rsvps/{invitation}'
 */
    const showForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\RsvpController::show
 * @see app/Http/Controllers/Admin/RsvpController.php:44
 * @route '/admin/rsvps/{invitation}'
 */
        showForm.get = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\RsvpController::show
 * @see app/Http/Controllers/Admin/RsvpController.php:44
 * @route '/admin/rsvps/{invitation}'
 */
        showForm.head = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\RsvpController::update
 * @see app/Http/Controllers/Admin/RsvpController.php:54
 * @route '/admin/rsvps/{invitation}'
 */
export const update = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/rsvps/{invitation}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\RsvpController::update
 * @see app/Http/Controllers/Admin/RsvpController.php:54
 * @route '/admin/rsvps/{invitation}'
 */
update.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { invitation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    invitation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invitation: typeof args.invitation === 'object'
                ? args.invitation.id
                : args.invitation,
                }

    return update.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RsvpController::update
 * @see app/Http/Controllers/Admin/RsvpController.php:54
 * @route '/admin/rsvps/{invitation}'
 */
update.put = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\RsvpController::update
 * @see app/Http/Controllers/Admin/RsvpController.php:54
 * @route '/admin/rsvps/{invitation}'
 */
    const updateForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\RsvpController::update
 * @see app/Http/Controllers/Admin/RsvpController.php:54
 * @route '/admin/rsvps/{invitation}'
 */
        updateForm.put = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const RsvpController = { exportMethod, index, show, update, export: exportMethod }

export default RsvpController