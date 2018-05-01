import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import s from './Author.css';


class Author extends Component {
    static propTypes = {
        author: PropTypes.string,
        imgUrl: PropTypes.string,
    };

    static defaultProps = {
        author: undefined,
        imgUrl: undefined,
    };

    render () {
        const { author, imgUrl } = this.props;
        return (
            <Fragment>
                <div>{author}</div>
                <div className={s.imgContainer}>
                    <img src={imgUrl} alt="user avatar" />
                </div>

            </Fragment>
        );
    }
}

export default Author;
