import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { noop } from '../../utils';
import s from './QuestionDetailsPage.css';
import Preloader from '../Preloader/Preloader';
import PostAuthor from '../PostAuthor/PostAuthor';


class QuestionDetailsPage extends Component {
    static propTypes = {
        getAnswersByQuestionId: PropTypes.func,
        getQuestionById: PropTypes.func,
        questionLoading: PropTypes.bool,
        answersLoading: PropTypes.bool,
        resetE: PropTypes.func,
        reputation: PropTypes.number,
        answer_id: PropTypes.number,
        questionLoadingError: PropTypes.string,
        answersLoadingError: PropTypes.string,
        match: PropTypes.shape({}),
        question: PropTypes.shape({
            title: PropTypes.string
        }),
        answers: PropTypes.arrayOf(PropTypes.shape({
            body: PropTypes.string
        }))

    };

    static defaultProps = {
        getAnswersByQuestionId: noop,
        getQuestionById: noop,
        resetE: noop,
        question: {},
        answers: []
    };

    componentDidMount () {
        const {
            getAnswersByQuestionId, getQuestionById,
            match: { params: { id } = {} } = {}
        } = this.props;

        if (id) {
            getAnswersByQuestionId(id);
            getQuestionById(id);
        }
    }

    componentWillUnmount () {
        this.props.resetE();
    }

    render () {
        const {
            question, answers, questionLoadingError, questionLoading,
            answersLoading, answersLoadingError
        } = this.props;

        const loading = questionLoading || answersLoading;
        const error = questionLoadingError || answersLoadingError;

        if (loading) return <Preloader />;

        if (error) return <div className="alert alert-danger">{error}</div>;

        return (
            <div className={cx(s.root, 'container')}>
                <div className="row">
                    <div className="card">
                        <div className="card-header">question</div>
                        <div className="card-body">
                            <h5 className="card-title">{question.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Description</h6>
                            {/*Тут использую dangerouslySetInnerHTML (для удобства) так как в ответе уже приходит html разметка,
                            на production конечно такое бы не использовал, ну или прошерстил бы регулярками или например sanitize-html*/}
                            <p className="card-text" dangerouslySetInnerHTML={{ __html: question.body }} />
                            <div className={s.authorContainer}>
                                <PostAuthor {...question.owner} />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {`${answers.length} Answer${answers.length === 1 ? '' : 's'}`}
                        </div>
                    </div>
                    {answers.map((a) => {
                        const { is_accepted: accepted, score, body, owner, answer_id: answerId } = a;

                        return (
                            <div key={answerId} className="card">
                                <div className="card-header">
                                    answer&nbsp;
                                    score:&nbsp;
                                    <span className={cx(s.score, { [s.accepted]: accepted })}
                                    >{score}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">Description</h6>
                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: body }} />
                                    <div className={s.authorContainer}>
                                        <PostAuthor {...owner} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default QuestionDetailsPage;
