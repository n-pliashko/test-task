const routes = {
    path: '/',
    indexRoute: {
        getComponent(nextState, cb) {
            import('./app/routes/welcome/index').then((m) => {
                cb(null, m.default)
            })
        }
    },
    childRoutes: [
        require('./app/routes/components/index').default,
        require('./app/routes/not-found/index').default
    ]
};

export default routes;