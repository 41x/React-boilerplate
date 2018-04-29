import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SearchPage from './SearchPage';
import ResultPage from './ResultPage';
import DetailsPage from './DetailsPage';
import FourOFourPage from './404Page';

class App extends Component {
    render () {
        return (
            <Switch>
                <Redirect from="/" exact to="/search" />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/results" component={ResultPage} />
                <Route exact path="/details" component={DetailsPage} />
                <Route component={FourOFourPage} />
            </Switch>
        );
    }
}

export default App;
