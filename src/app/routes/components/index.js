export default {
    path: 'components',
    component: require('../../../app/components/layout').default,
    childRoutes: [
        {
            path: 'edit/:filename',
            getComponent(nextState, cb) {
                import('./containers/ComponentsEditor').then((m) => {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'view/:filename',
            getComponent(nextState, cb) {
                import('./containers/ComponentViewer').then((m) => {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'list',
            getComponent(nextState, cb) {
                import('./containers/ListComponents').then((m) => {
                    cb(null, m.default)
                })
            }
        }
    ]
};