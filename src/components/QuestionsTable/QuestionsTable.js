import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Question from '../Question/QuestionItem';
import s from './QuestionsTable.css';
import { noop } from '../../utils';

class QuestionsTable extends Component {
    static propTypes = {
        questions: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
        onTagClick: PropTypes.func,
        onSort: PropTypes.func,
        onAuthorClick: PropTypes.func,
    };

    static defaultProps = {
        onTagClick: noop,
        onAuthorClick: noop,
        onSort: noop,
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
            <table className={cx(s.root, 'table table-striped')}>
                <thead>
                <tr>
                    <th data-header="author" onClick={this.props.onSort}>Author</th>
                    <th data-header="title" onClick={this.props.onSort}>Topic</th>
                    <th
                        data-header="answers"
                        onClick={this.props.onSort}
                        className={s.answers}
                    >Replies
                    </th>
                    <th>Tags</th>
                </tr>
                </thead>
                <tbody>{trs}</tbody>
            </table>
        );
    }
}

export default QuestionsTable;
