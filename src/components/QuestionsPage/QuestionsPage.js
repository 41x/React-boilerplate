import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import cx from 'classnames';
import { noop } from '../../utils';
import Question from '../Question/QuestionItem';
import s from './QuestionsPage.css';
import Preloader from '../Preloader/Preloader';


class ResultPage extends Component {
    static propTypes = {
        questions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
        location: PropTypes.shape({ search: PropTypes.string }),
        questionsLoadingError: PropTypes.string,
        questionsLoading: PropTypes.bool,
        resetL: PropTypes.func,
        getQuestions: PropTypes.func,

    };

    static defaultProps = {
        questions: [],
        questionsLoadingError: undefined,
        questionsLoading: undefined,
        resetL: noop,
        location: undefined,
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

    renderTable = () => {
        const { questions } = this.props;
        const trs = questions.map((q) => {
            const {
                owner: { display_name: author, profile_image: imgUrl } = {},
                title, answer_count: answers, tags
            } = q;
            return (
                <Question
                    key={q.question_id}
                    questionId={q.question_id}
                    author={author}
                    title={title}
                    answers={answers}
                    tags={tags}
                    img={imgUrl}
                />
            );
        });

        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Автор</th>
                    <th>Тема</th>
                    <th className={s.answers}>Кол-во ответов</th>
                    <th>Теги</th>
                </tr>
                </thead>
                <tbody>{trs}</tbody>
            </table>
        );
    };

    renderContent = () => {
        const { questionsLoadingError, questionsLoading } = this.props;
        let view;
        if (questionsLoading) {
            view = <Preloader />;
        } else if (questionsLoadingError) {
            view = <div className={cx('alert alert-danger')}>{questionsLoadingError}</div>;
        } else {
            view = this.renderTable();
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
