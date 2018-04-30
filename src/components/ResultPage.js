import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultPage extends Component {
    static propTypes = {
        questions: PropTypes.arrayOf({}),
    };

    static defaultProps = {
        questions: undefined,

    };


    render () {
        const { questions } = this.props;
        return (
            <div>
                {questions.map(q => <div>{q.title}</div>)}
            </div>
        );
    }
}

export default ResultPage;
