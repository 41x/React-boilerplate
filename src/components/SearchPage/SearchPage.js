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
                <div className={cx(s.content, 'row justify-content-center')}>
                    <form
                        onSubmit={this.onSubmit}
                        className={cx(s.form, 'jumbotron col-6')}
                    >
                        <h6 className="col-12">Поиск по StackOverflow</h6>

                        <input
                            className={cx('col-12', 'form-control')}
                            type="text"
                            value={this.state.input}
                            onChange={this.inputChange}
                            disabled={questionsLoading}
                            placeholder="Введите запрос..."
                            tabIndex={1}
                        />
                        <div className={s.buttonContainer}>
                            <button
                                tabIndex={2}
                                className="btn btn-primary col-4"
                            >Поиск
                            </button>
                        </div>
                        {!!questionsLoadingError &&
                        <div className={cx(s.error, 'alert alert-danger')}>{questionsLoadingError}</div>}
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchPage;
