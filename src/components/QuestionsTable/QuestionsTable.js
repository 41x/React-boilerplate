import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from '../Question/QuestionItem';
import s from './QuestionsTable.css';
import { noop } from '../../utils';

class QuestionsTable extends Component {
    static propTypes = {
        questions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
        onTagClick: PropTypes.func,
        onAuthorClick: PropTypes.func,
    };

    static defaultProps = {
        onTagClick: noop,
        onAuthorClick: noop,
    };

    render () {
        const { questions, onTagClick, onAuthorClick } = this.props;
        if (!questions) return null;

        const trs = questions.map((q) => {
            const {
                owner: { user_id: userId, display_name: author, profile_image: imgUrl } = {},
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
                    onTagClick={onTagClick}
                    onAuthorClick={onAuthorClick}
                    userId={userId}
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
    }
}

export default QuestionsTable;
