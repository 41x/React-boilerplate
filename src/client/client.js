import { Router } from 'react-router-dom';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'normalize.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from '../components/App';
import rootReducer from '../reducers';
import history from './history';


const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, createLogger())
);

render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);
