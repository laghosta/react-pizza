import React from 'react';
import styles from './sort.module.scss';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SetSortBy} from "../../redux/slices/filterSlice";
import {TSort, SortPropertyEnum} from "../../redux/types";

interface PopupClick{
    path:Node[]
}
export const sortList = [
    {name : 'популярности (DESC)', sortProperty : SortPropertyEnum.RATING_DESC},
    {name : 'популярности (ASC)', sortProperty : SortPropertyEnum.RATING_ASC},
    {name : 'цене (DESC)', sortProperty : SortPropertyEnum.PRICE_DESC},
    {name : 'цене (ASC)', sortProperty : SortPropertyEnum.PRICE_ASC},
    {name : 'алфавиту (DESC)', sortProperty : SortPropertyEnum.TITLE_DESC},
    {name : 'алфавиту (ASC)', sortProperty : SortPropertyEnum.TITLE_ASC}
]
const Sort = () => {
    const [sortOpened, setSortOpened] = React.useState(false)
    const sortRef = React.useRef(null)
    const dispatch = useAppDispatch()
    const sortBy = useAppSelector(state => state.filter.sortBy)
    const setSortSelected = (obj:TSort) =>{
        dispatch(SetSortBy(obj))
        setSortOpened(false)
    }
    React.useEffect(()=>{
       const handleClickOutside = (event:MouseEvent) =>{
           const _event = event as unknown as PopupClick
           if (sortRef.current && !_event.path.includes(sortRef.current)) {
               setSortOpened(false);
           }
       }
        document.body.addEventListener("click", handleClickOutside)
        return () => document.body.removeEventListener('click', handleClickOutside);

    },[])


    return (
        <div ref={sortRef} className={styles.sort}>
            <div className={styles.sort__label}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"></path>
                </svg>
                <b>Сортировка по: </b>
                <span onClick={() => setSortOpened(!sortOpened)}>{sortBy.name}</span>
            </div>
            <div className={styles.sort__popup}>
                <ul style={{display: sortOpened ? "block" : "none"}}
                    className={styles.sort__popupList}>
                    {
                        sortList.map((el, id) =>
                            <li key={id}
                                className={ sortBy.sortProperty === el.sortProperty ? styles.active : ''}
                                onClick={() => setSortSelected(el)}>{el.name}
                            </li>
                        )
                    }
                </ul>
            </div>

        </div>
    );
};

export default Sort;