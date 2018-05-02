import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './QuestionItem.css';
import Author from '../Author/Author';
import { noop } from '../../utils';


class Question extends Component {
    static propTypes = {
        author: PropTypes.string,
        img: PropTypes.string,
        title: PropTypes.string,
        userId: PropTypes.number,
        questionId: PropTypes.number,
        answers: PropTypes.number,
        tags: PropTypes.arrayOf(PropTypes.string),
        onTagClick: PropTypes.func,
        onAuthorClick: PropTypes.func,
    };

    static defaultProps = {
        onTagClick: noop,
        onAuthorClick: noop,
    };

    renderTags = () => {
        const { tags, onTagClick } = this.props;
        return tags.map((tag, i) => (
            <button
                key={i}
                data-tag={tag}
                onClick={onTagClick}
                className={cx(s.tag, 'btn btn-default')}
            >{tag}
            </button>
        ));
    };

    render () {
        const { author, title, answers, img, questionId, onAuthorClick, userId } = this.props;
        return (
            <tr>
                <td
                    onClick={onAuthorClick}
                    data-author={userId}
                    className={s.authorContainer}
                >
                    <Author author={author} imgUrl={img} />
                </td>
                <td><Link to={`/questions/${questionId}`}>{title}</Link></td>
                <td><Link to={`/questions/${questionId}`}>{answers}</Link></td>
                <td>{this.renderTags()}</td>
            </tr>
        );
    }
}

export default Question;
