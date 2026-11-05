import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InvitationController::exportMethod
 * @see app/Http/Controllers/Admin/InvitationController.php:179
 * @route '/admin/invitations/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/invitations/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::exportMethod
 * @see app/Http/Controllers/Admin/InvitationController.php:179
 * @route '/admin/invitations/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::exportMethod
 * @see app/Http/Controllers/Admin/InvitationController.php:179
 * @route '/admin/invitations/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvitationController::exportMethod
 * @see app/Http/Controllers/Admin/InvitationController.php:179
 * @route '/admin/invitations/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::exportMethod
 * @see app/Http/Controllers/Admin/InvitationController.php:179
 * @route '/admin/invitations/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::exportMethod
 * @see app/Http/Controllers/Admin/InvitationController.php:179
 * @route '/admin/invitations/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvitationController::exportMethod
 * @see app/Http/Controllers/Admin/InvitationController.php:179
 * @route '/admin/invitations/export'
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
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:30
 * @route '/admin/invitations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/invitations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:30
 * @route '/admin/invitations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:30
 * @route '/admin/invitations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:30
 * @route '/admin/invitations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:30
 * @route '/admin/invitations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:30
 * @route '/admin/invitations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvitationController::index
 * @see app/Http/Controllers/Admin/InvitationController.php:30
 * @route '/admin/invitations'
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
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:51
 * @route '/admin/invitations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/invitations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:51
 * @route '/admin/invitations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:51
 * @route '/admin/invitations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:51
 * @route '/admin/invitations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:51
 * @route '/admin/invitations/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:51
 * @route '/admin/invitations/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvitationController::create
 * @see app/Http/Controllers/Admin/InvitationController.php:51
 * @route '/admin/invitations/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:60
 * @route '/admin/invitations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/invitations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:60
 * @route '/admin/invitations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:60
 * @route '/admin/invitations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:60
 * @route '/admin/invitations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::store
 * @see app/Http/Controllers/Admin/InvitationController.php:60
 * @route '/admin/invitations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:73
 * @route '/admin/invitations/{invitation}'
 */
export const show = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/invitations/{invitation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:73
 * @route '/admin/invitations/{invitation}'
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
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:73
 * @route '/admin/invitations/{invitation}'
 */
show.get = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:73
 * @route '/admin/invitations/{invitation}'
 */
show.head = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:73
 * @route '/admin/invitations/{invitation}'
 */
    const showForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:73
 * @route '/admin/invitations/{invitation}'
 */
        showForm.get = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvitationController::show
 * @see app/Http/Controllers/Admin/InvitationController.php:73
 * @route '/admin/invitations/{invitation}'
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
* @see \App\Http\Controllers\Admin\InvitationController::edit
 * @see app/Http/Controllers/Admin/InvitationController.php:83
 * @route '/admin/invitations/{invitation}/edit'
 */
export const edit = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/invitations/{invitation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::edit
 * @see app/Http/Controllers/Admin/InvitationController.php:83
 * @route '/admin/invitations/{invitation}/edit'
 */
edit.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::edit
 * @see app/Http/Controllers/Admin/InvitationController.php:83
 * @route '/admin/invitations/{invitation}/edit'
 */
edit.get = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvitationController::edit
 * @see app/Http/Controllers/Admin/InvitationController.php:83
 * @route '/admin/invitations/{invitation}/edit'
 */
edit.head = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::edit
 * @see app/Http/Controllers/Admin/InvitationController.php:83
 * @route '/admin/invitations/{invitation}/edit'
 */
    const editForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::edit
 * @see app/Http/Controllers/Admin/InvitationController.php:83
 * @route '/admin/invitations/{invitation}/edit'
 */
        editForm.get = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvitationController::edit
 * @see app/Http/Controllers/Admin/InvitationController.php:83
 * @route '/admin/invitations/{invitation}/edit'
 */
        editForm.head = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:92
 * @route '/admin/invitations/{invitation}'
 */
export const update = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/invitations/{invitation}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:92
 * @route '/admin/invitations/{invitation}'
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
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:92
 * @route '/admin/invitations/{invitation}'
 */
update.put = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:92
 * @route '/admin/invitations/{invitation}'
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
* @see \App\Http\Controllers\Admin\InvitationController::update
 * @see app/Http/Controllers/Admin/InvitationController.php:92
 * @route '/admin/invitations/{invitation}'
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
/**
* @see \App\Http\Controllers\Admin\InvitationController::status
 * @see app/Http/Controllers/Admin/InvitationController.php:101
 * @route '/admin/invitations/{invitation}/status'
 */
export const status = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/admin/invitations/{invitation}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::status
 * @see app/Http/Controllers/Admin/InvitationController.php:101
 * @route '/admin/invitations/{invitation}/status'
 */
status.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::status
 * @see app/Http/Controllers/Admin/InvitationController.php:101
 * @route '/admin/invitations/{invitation}/status'
 */
status.patch = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::status
 * @see app/Http/Controllers/Admin/InvitationController.php:101
 * @route '/admin/invitations/{invitation}/status'
 */
    const statusForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::status
 * @see app/Http/Controllers/Admin/InvitationController.php:101
 * @route '/admin/invitations/{invitation}/status'
 */
        statusForm.patch = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\Admin\InvitationController::regenerate
 * @see app/Http/Controllers/Admin/InvitationController.php:116
 * @route '/admin/invitations/{invitation}/regenerate'
 */
export const regenerate = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(args, options),
    method: 'post',
})

regenerate.definition = {
    methods: ["post"],
    url: '/admin/invitations/{invitation}/regenerate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::regenerate
 * @see app/Http/Controllers/Admin/InvitationController.php:116
 * @route '/admin/invitations/{invitation}/regenerate'
 */
regenerate.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return regenerate.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::regenerate
 * @see app/Http/Controllers/Admin/InvitationController.php:116
 * @route '/admin/invitations/{invitation}/regenerate'
 */
regenerate.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::regenerate
 * @see app/Http/Controllers/Admin/InvitationController.php:116
 * @route '/admin/invitations/{invitation}/regenerate'
 */
    const regenerateForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: regenerate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::regenerate
 * @see app/Http/Controllers/Admin/InvitationController.php:116
 * @route '/admin/invitations/{invitation}/regenerate'
 */
        regenerateForm.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: regenerate.url(args, options),
            method: 'post',
        })
    
    regenerate.form = regenerateForm
/**
* @see \App\Http\Controllers\Admin\InvitationController::email
 * @see app/Http/Controllers/Admin/InvitationController.php:126
 * @route '/admin/invitations/{invitation}/email'
 */
export const email = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(args, options),
    method: 'post',
})

email.definition = {
    methods: ["post"],
    url: '/admin/invitations/{invitation}/email',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::email
 * @see app/Http/Controllers/Admin/InvitationController.php:126
 * @route '/admin/invitations/{invitation}/email'
 */
email.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return email.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::email
 * @see app/Http/Controllers/Admin/InvitationController.php:126
 * @route '/admin/invitations/{invitation}/email'
 */
email.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::email
 * @see app/Http/Controllers/Admin/InvitationController.php:126
 * @route '/admin/invitations/{invitation}/email'
 */
    const emailForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: email.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::email
 * @see app/Http/Controllers/Admin/InvitationController.php:126
 * @route '/admin/invitations/{invitation}/email'
 */
        emailForm.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: email.url(args, options),
            method: 'post',
        })
    
    email.form = emailForm
/**
* @see \App\Http\Controllers\Admin\InvitationController::preview
 * @see app/Http/Controllers/Admin/InvitationController.php:164
 * @route '/admin/invitations/{invitation}/preview'
 */
export const preview = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(args, options),
    method: 'post',
})

preview.definition = {
    methods: ["post"],
    url: '/admin/invitations/{invitation}/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InvitationController::preview
 * @see app/Http/Controllers/Admin/InvitationController.php:164
 * @route '/admin/invitations/{invitation}/preview'
 */
preview.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return preview.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvitationController::preview
 * @see app/Http/Controllers/Admin/InvitationController.php:164
 * @route '/admin/invitations/{invitation}/preview'
 */
preview.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InvitationController::preview
 * @see app/Http/Controllers/Admin/InvitationController.php:164
 * @route '/admin/invitations/{invitation}/preview'
 */
    const previewForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: preview.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InvitationController::preview
 * @see app/Http/Controllers/Admin/InvitationController.php:164
 * @route '/admin/invitations/{invitation}/preview'
 */
        previewForm.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: preview.url(args, options),
            method: 'post',
        })
    
    preview.form = previewForm
const invitations = {
    export: Object.assign(exportMethod, exportMethod),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
status: Object.assign(status, status),
regenerate: Object.assign(regenerate, regenerate),
email: Object.assign(email, email),
preview: Object.assign(preview, preview),
}

export default invitations