import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import s from './SearchPage.css';


class SearchPage extends Component {
    static propTypes = {
        getQuestions: PropTypes.func,
        questionsLoading: PropTypes.bool,
        questionsLoadingError: PropTypes.string,
    };

    static defaultProps = {
        getQuestions: () => {
        },
        questionsLoading: undefined,
        questionsLoadingError: undefined,

    };

    constructor (props) {
        super(props);
        this.state = {
            input: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { input } = this.state;
        if (input) {
            this.props.getQuestions(input);
        }
    };

    inputChange = (e) => {
        this.setState({ input: e.target.value });
    };

    render () {
        const { questionsLoading, questionsLoadingError } = this.props;
        return (
            <div className="container">
                <div className={cx(s.content, 'row justify-content-md-center')}>
                    <form
                        onSubmit={this.onSubmit}
                        className={cx(s.form, 'jumbotron col-6')}
                    >
                        <h5 className="col-12">Поиск по StackOverflow</h5>

                        <input
                            className={cx(s.redInput, 'col-8')}
                            type="text"
                            value={this.state.input}
                            onChange={this.inputChange}
                            disabled={questionsLoading}
                            placeholder="Введите запрос..."
                        />
                        <button className="col-4">Поиск</button>

                        <div>{questionsLoadingError}</div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchPage;
