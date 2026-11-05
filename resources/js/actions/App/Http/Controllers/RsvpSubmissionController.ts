import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RsvpSubmissionController::store
 * @see app/Http/Controllers/RsvpSubmissionController.php:13
 * @route '/invitation/rsvp'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/invitation/rsvp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RsvpSubmissionController::store
 * @see app/Http/Controllers/RsvpSubmissionController.php:13
 * @route '/invitation/rsvp'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RsvpSubmissionController::store
 * @see app/Http/Controllers/RsvpSubmissionController.php:13
 * @route '/invitation/rsvp'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RsvpSubmissionController::store
 * @see app/Http/Controllers/RsvpSubmissionController.php:13
 * @route '/invitation/rsvp'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RsvpSubmissionController::store
 * @see app/Http/Controllers/RsvpSubmissionController.php:13
 * @route '/invitation/rsvp'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const RsvpSubmissionController = { store }

export default RsvpSubmissionController