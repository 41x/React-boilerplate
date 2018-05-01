import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import s from './SearchPage.css';


class SearchPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            input: ''
        };
    }

    inputChange = (e) => {
        const input = e.target.value;
        this.setState({ input, url: `/questions?query=${encodeURI(input)}` });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.history.push(this.state.url);
    };

    render () {
        const { input } = this.state;
        return (
            <div className="container">
                <div className={cx(s.content, 'row justify-content-center')}>
                    <form
                        onSubmit={this.onSubmit}
                        className={cx(s.form, 'form-group jumbotron col-6')}
                    >
                        <h6 className="col-12">Поиск по StackOverflow</h6>

                        <input
                            className={cx('col-12', 'form-control')}
                            type="text"
                            value={input}
                            onChange={this.inputChange}
                            placeholder="Введите запрос..."
                            tabIndex={1}
                        />
                        <div className={s.buttonContainer}>
                            <button
                                tabIndex={2}
                                className="btn btn-primary col-4"
                                disabled={!input}
                            >Поиск
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchPage;
