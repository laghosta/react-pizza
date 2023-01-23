import React from 'react';
import styles from './sort.module.scss';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SetSortBy} from "../../redux/slices/filterSlice";



const Sort = () => {
    const [sortOpened, setSortOpened] = React.useState(false)
    const dispatch = useAppDispatch()
    const sortBy = useAppSelector(state => state.filter.sortBy)
    const setSortSelected = (id: number) =>{
        dispatch(SetSortBy(id))
        setSortOpened(false)
    }
    const sort: string[] = ['популярности (DESC)', 'популярности (ASC)', 'цене (DESC)', 'цене (ASC)', 'алфавиту (DESC)', 'алфавиту (ASC)']

    return (
        <div className={styles.sort}>
            <div className={styles.sort__label}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"></path>
                </svg>
                <b>Сортировка по: </b>
                <span onClick={() => setSortOpened(!sortOpened)}>{sort[sortBy]}</span>
            </div>
            <div className={styles.sort__popup}>
                <ul style={{display: sortOpened ? "block" : "none"}}
                    className={styles.sort__popupList}>
                    {
                        sort.map((el, id) =>
                            <li key={id}
                                className={sortBy === id ? styles.active : ""}
                                onClick={() => setSortSelected(id)}>{sort[id]}
                            </li>
                        )
                    }
                </ul>
            </div>

        </div>
    );
};

export default Sort;