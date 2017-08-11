import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import { Provider } from 'react-redux'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const history = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    composeEnhancers(
        applyMiddleware(logger, thunk, routerMiddleware(history))
    )
)

ReactDOM.render(
    <Provider store={store}>
         <ConnectedRouter history={history}>
             <App />
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
)
registerServiceWorker();
