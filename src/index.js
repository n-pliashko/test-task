import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import {Router, browserHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import routes_path from './routes';

ReactDOM.render((
    <Router history={browserHistory}
            routes={routes_path}
    />
), document.getElementById('root'));
registerServiceWorker();
