import React, {useRef} from 'react';
import styles from './header.module.scss'
import {Link} from "react-router-dom";
import {SetSearchValue} from "../../redux/slices/filterSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import debounce from 'lodash.debounce'
import {calcCartPizzasCount, calcCartPizzasPrice} from "../../redux/slices/cartSlice";
const Header = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState<string>('');
    const searchValue = useAppSelector(state => state.filter.searchValue)
    const inputRef = useRef<HTMLInputElement>(null)
    const pizzasCount = useAppSelector(state=> state.cart.pizzasCount)
    const pizzasPrice = useAppSelector(state=> state.cart.sum)

    function sortValidation (){
        if(searchValue){
            setValue("")
            dispatch(SetSearchValue(""))
            inputRef.current?.focus()
        }
    }
    const updateSearchValue = React.useCallback(
        debounce((value: string) => {
            dispatch(SetSearchValue(value));
        }, 300),
        [],
    );
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length === 0){
            setValue("");
            updateSearchValue("");
        }
        else{
            setValue(e.target.value);
            updateSearchValue(value);
        }

    };
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link to='/'  className={styles.header__logo}>
                    <img width="38" src="/img/pizza-logo.svg" alt="Pizza logo"/>
                    <div>
                        <h1>React Pizza</h1>
                        <p>самая вкусная пицца во вселенной</p>
                    </div>
                </Link>
                <div className={styles.header__search}>
                    <svg className="Search_icon__XMmYc" enableBackground="new 0 0 32 32" id="EditableLine"
                         version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="grey" strokeLinecap="round"
                                strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"></circle>
                        <line fill="none" id="XMLID_44_" stroke="grey" strokeLinecap="round" strokeLinejoin="round"
                              strokeMiterlimit="10" strokeWidth="2" x1="27" x2="20.366" y1="27" y2="20.366"></line>
                    </svg>
                    <input  ref={inputRef}
                            value={value}
                            onChange={onChangeInput}
                            type="text"
                            placeholder={"Поиск пиццы"}
                    />
                    {
                        searchValue &&
                        <svg onClick={sortValidation}
                             className="Search_clearIcon__eIw10" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                        </svg>
                    }

                </div>
                <div>
                    <Link  to='/cart' className={styles.header__cartBtn}>
                        <span>{pizzasPrice} ₴</span>
                        <div className={styles.delimiter}></div>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>{pizzasCount}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;