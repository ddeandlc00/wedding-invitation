import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InvitationAccessController::store
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/invitation/access',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvitationAccessController::store
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationAccessController::store
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InvitationAccessController::store
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InvitationAccessController::store
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\InvitationAccessController::enter
 * @see app/Http/Controllers/InvitationAccessController.php:18
 * @route '/invitation/{code}'
 */
export const enter = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: enter.url(args, options),
    method: 'get',
})

enter.definition = {
    methods: ["get","head"],
    url: '/invitation/{code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationAccessController::enter
 * @see app/Http/Controllers/InvitationAccessController.php:18
 * @route '/invitation/{code}'
 */
enter.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return enter.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationAccessController::enter
 * @see app/Http/Controllers/InvitationAccessController.php:18
 * @route '/invitation/{code}'
 */
enter.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: enter.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InvitationAccessController::enter
 * @see app/Http/Controllers/InvitationAccessController.php:18
 * @route '/invitation/{code}'
 */
enter.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: enter.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InvitationAccessController::enter
 * @see app/Http/Controllers/InvitationAccessController.php:18
 * @route '/invitation/{code}'
 */
    const enterForm = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: enter.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InvitationAccessController::enter
 * @see app/Http/Controllers/InvitationAccessController.php:18
 * @route '/invitation/{code}'
 */
        enterForm.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: enter.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InvitationAccessController::enter
 * @see app/Http/Controllers/InvitationAccessController.php:18
 * @route '/invitation/{code}'
 */
        enterForm.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: enter.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    enter.form = enterForm
/**
* @see \App\Http\Controllers\InvitationAccessController::leave
 * @see app/Http/Controllers/InvitationAccessController.php:38
 * @route '/invitation/leave'
 */
export const leave = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: leave.url(options),
    method: 'post',
})

leave.definition = {
    methods: ["post"],
    url: '/invitation/leave',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvitationAccessController::leave
 * @see app/Http/Controllers/InvitationAccessController.php:38
 * @route '/invitation/leave'
 */
leave.url = (options?: RouteQueryOptions) => {
    return leave.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationAccessController::leave
 * @see app/Http/Controllers/InvitationAccessController.php:38
 * @route '/invitation/leave'
 */
leave.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: leave.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InvitationAccessController::leave
 * @see app/Http/Controllers/InvitationAccessController.php:38
 * @route '/invitation/leave'
 */
    const leaveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: leave.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InvitationAccessController::leave
 * @see app/Http/Controllers/InvitationAccessController.php:38
 * @route '/invitation/leave'
 */
        leaveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: leave.url(options),
            method: 'post',
        })
    
    leave.form = leaveForm
const InvitationAccessController = { store, enter, leave }

export default InvitationAccessController