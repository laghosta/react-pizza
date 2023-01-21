import React from 'react';
import Categories from "../Categories/Categories";
import Sort from "../Sort/Sort";
import styles from './contentTop.module.scss'
import {SortContext} from "../../pages/Home/Home";

const ContentTop = () => {
    const {sort, sortBy, setSortBy} = React.useContext(SortContext)
    return (
        <div className={styles.contentTop}>
            <Categories/>
            <Sort sort={sort} sortBy={sortBy} setSortBy={setSortBy}/>
        </div>
    );
};

export default ContentTop;