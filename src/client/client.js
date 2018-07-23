import { Router } from 'react-router-dom';
import React, { createElement } from 'react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'normalize.css';
import { AppContainer } from 'react-hot-loader';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from '../components/App';
import rootReducer from '../reducers';
import history from './history';


const store = createStore(
    rootReducer,
    (
        NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const renderApp = (Application) => {
    render(
        <Provider store={store}>
            <Router history={history}>
                <AppContainer>
                    {createElement(Application)}
                </AppContainer>
            </Router>
        </Provider>,
        document.getElementById('app')
    );
};

renderApp(App);

// This is needed for Hot Module Replacement
if (module.hot) {
    module.hot.accept('../components/App', () => {
        const NextApp = require('../components/App').default;
        renderApp(NextApp);
    });
}

