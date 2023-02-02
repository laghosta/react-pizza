import React from 'react';
import styles from "./cartempty.module.scss"
import {Link} from "react-router-dom";
const CartEmpty = () => {
    return (
        <div className={styles.cartEmpty}>
            Корзина пустая 😕
            <img src="/img/cartEmpty.png" alt=""/>
            <Link className={styles.backBtn} to='/'>Вернуться назад</Link>
        </div>
    );
};

export default CartEmpty;