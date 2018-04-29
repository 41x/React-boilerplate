import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from '../components/App';
import rootReducer from '../reducers';


const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, createLogger())
);

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
