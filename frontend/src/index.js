import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import { Router } from 'react-router-dom'
import { routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import { Provider } from 'react-redux'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const history = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(logger, thunk, routerMiddleware(history))
    )
)

ReactDOM.render(
    <Provider store={store}>
         <Router history={history}>
             <App />
        </Router>
    </Provider>, 
    document.getElementById('root')
)
registerServiceWorker();
