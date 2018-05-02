import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import cx from 'classnames';
import { noop } from '../../utils';
import Preloader from '../Preloader/Preloader';
import QuestionsTable from '../QuestionsTable/QuestionsTable';


class ResultPage extends Component {
    static propTypes = {
        questions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
        location: PropTypes.shape({ search: PropTypes.string }),
        questionsLoadingError: PropTypes.string,
        questionsLoading: PropTypes.bool,
        resetL: PropTypes.func,
        getQuestionsByUserId: PropTypes.func,
        getQuestions: PropTypes.func,
        getQuestionsByTag: PropTypes.func,

    };

    static defaultProps = {
        questions: [],
        resetL: noop,
        getQuestionsByTag: noop,
        getQuestionsByUserId: noop,
    };

    componentDidMount () {
        const { location, getQuestions } = this.props;
        if (location) {
            const { query } = qs.parse(location.search);
            if (query) {
                getQuestions(query);
            }
        }
    }

    componentWillUnmount () {
        this.props.resetL();
    }

    onTagClick = (e) => {
        const { target: { dataset: { tag } = {} } = {} } = e;
        if (tag && this.lastTag !== tag) {
            this.lastTag = tag;
            this.props.getQuestionsByTag(tag);
        }
    };

    onAuthorClick = (e) => {
        const { currentTarget: { dataset: { author } = {} } = {} } = e;
        if (author && this.author !== author) {
            this.author = author;
            this.props.getQuestionsByUserId(author);
        }
    };

    renderContent = () => {
        const { questionsLoadingError, questionsLoading, questions } = this.props;
        let view;
        if (questionsLoading) {
            view = <Preloader />;
        } else if (questionsLoadingError) {
            view = <div className={cx('alert alert-danger')}>{questionsLoadingError}</div>;
        } else {
            view = (
                <QuestionsTable
                    onTagClick={this.onTagClick}
                    onAuthorClick={this.onAuthorClick}
                    questions={questions}
                />
            );
        }

        return view;
    };

    render () {
        return (
            <div className={cx('container')}>
                <h6>Результаты поиска</h6>
                <div className="row">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

export default ResultPage;
