import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Question from '../Question/Question';
import s from './ResultPage.css';

class ResultPage extends Component {
    static propTypes = {
        questions: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string
        })),
    };

    static defaultProps = {
        questions: [],

    };

    renderTable = () => {
        const { questions } = this.props;
        const trs = questions.map((q) => {
            const { owner: { display_name: author } = {}, title, answer_count: answers, tags } = q;
            return (
                <Question
                    key={q.question_id}
                    author={author}
                    title={title}
                    answers={answers}
                    tags={tags}
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


    render () {
        return (
            <div className={cx('container')}>
                <div className="row">
                    {this.renderTable()}
                </div>
            </div>
        );
    }
}

export default ResultPage;
