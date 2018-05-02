import React from 'react';
import cx from 'classnames';
import s from './PostAuthor.css';


const PostAuthor = (author) => {
    const { display_name: name, profile_image: img, reputation, link } = author;
    return (
        <div className={s.authorContainer}>
            <div className={cx(s.avatarContainer)}>
                <img src={img} alt="avatar" />
            </div>
            <div className={cx(s.name)}>
                <a href={link}>{name}</a>
                <div>{`rep: ${reputation}`}</div>
            </div>
        </div>

    );
};

export default PostAuthor;
