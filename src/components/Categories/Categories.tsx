import React from 'react';
import styles from '../Categories/categories.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SetSelectedCategoryIndex} from "../../redux/slices/filterSlice";

const Categories = () => {
    const categories:string[]=["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"]
    const dispatch = useAppDispatch()
    const selectedCategoryIndex = useAppSelector(state => state.filter.CategoryIndex)
    return (
        <div className={styles.categories}>
            <ul className={styles.categories__list}>
                {categories.map((el, id) =>
                    <li className={selectedCategoryIndex === id ? styles.active : ""}
                        onClick={() => dispatch(SetSelectedCategoryIndex(id))} key={id}>{el}</li>
                )}
            </ul>
        </div>

    );
};

export default Categories;