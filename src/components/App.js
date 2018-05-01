import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SearchPage from '../containers/Search.container';
import QuestionsPage from '../containers/Questions.container';
import QuestionDetails from '../containers/QuestionDetails.container';
import FourOFourPage from './404Page';


class App extends Component {
    render () {
        return (
            <Switch>
                <Redirect from="/" exact to="/search" />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/questions" component={QuestionsPage} />
                <Route exact path="/questions:id" component={QuestionDetails} />
                <Route component={FourOFourPage} />
            </Switch>
        );
    }
}

export default App;
