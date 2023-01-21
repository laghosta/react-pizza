import React from 'react';
import styles from '../Categories/categories.module.scss'
import {SortContext} from "../../pages/Home/Home";
const Categories = () => {
    const categories:string[]=["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"]
    const {selectedCategoryIndex, setSelectedCategoryIndex} = React.useContext(SortContext)
    return (
        <div className={styles.categories}>
            <ul className={styles.categories__list}>
                {categories.map((el, id) =>
                    <li className={selectedCategoryIndex === id ? styles.active : ""}
                        onClick={() => setSelectedCategoryIndex(id)} key={id}>{el}</li>
                )}
            </ul>
        </div>

    );
};

export default Categories;