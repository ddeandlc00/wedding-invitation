import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
const InvitationPageController = { show }

export default InvitationPageController