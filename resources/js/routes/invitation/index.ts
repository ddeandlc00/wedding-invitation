import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import rsvp from './rsvp'
/**
* @see \App\Http\Controllers\InvitationAccessController::access
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
export const access = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: access.url(options),
    method: 'post',
})

access.definition = {
    methods: ["post"],
    url: '/invitation/access',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvitationAccessController::access
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
access.url = (options?: RouteQueryOptions) => {
    return access.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationAccessController::access
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
access.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: access.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InvitationAccessController::access
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
    const accessForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: access.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InvitationAccessController::access
 * @see app/Http/Controllers/InvitationAccessController.php:13
 * @route '/invitation/access'
 */
        accessForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: access.url(options),
            method: 'post',
        })
    
    access.form = accessForm
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
* @see \App\Http\Controllers\InvitationPageController::show
 * @see app/Http/Controllers/InvitationPageController.php:12
 * @route '/invitation'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/invitation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationPageController::show
 * @see app/Http/Controllers/InvitationPageController.php:12
 * @route '/invitation'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationPageController::show
 * @see app/Http/Controllers/InvitationPageController.php:12
 * @route '/invitation'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InvitationPageController::show
 * @see app/Http/Controllers/InvitationPageController.php:12
 * @route '/invitation'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InvitationPageController::show
 * @see app/Http/Controllers/InvitationPageController.php:12
 * @route '/invitation'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InvitationPageController::show
 * @see app/Http/Controllers/InvitationPageController.php:12
 * @route '/invitation'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InvitationPageController::show
 * @see app/Http/Controllers/InvitationPageController.php:12
 * @route '/invitation'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
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
const invitation = {
    access: Object.assign(access, access),
enter: Object.assign(enter, enter),
show: Object.assign(show, show),
rsvp: Object.assign(rsvp, rsvp),
leave: Object.assign(leave, leave),
}

export default invitation