export default {
    childRoutes: [
        {
            path: '*',
            getComponent(nextState, cb) {
                import('./containers/PageNotFound').then((m) => {
                    cb(null, m.default)
                })
            }
        },
    ]

};