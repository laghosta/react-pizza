import React from 'react';
import Categories from "../Categories/Categories";
import Sort from "../Sort/Sort";
import styles from './contentTop.module.scss'

const ContentTop = () => {
    return (
        <div className={styles.contentTop}>
            <Categories/>
            <Sort />
        </div>
    );
};

export default ContentTop;