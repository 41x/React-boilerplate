import React from 'react';
import s from './Preloader.css';

const Preloader = () => (
    <div className={s.spinner}>
        <div className={s.doubleBounce1} />
        <div className={s.doubleBounce2} />
    </div>
);

export default Preloader;
