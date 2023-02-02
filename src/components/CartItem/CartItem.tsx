import React from 'react';
import styles from "./cartItem.module.scss";
import {ICartPizza} from "../PizzaItem/PizzaItem";
import {useAppDispatch} from "../../redux/hooks";
import {pizzaCountMinus, pizzaCountPlus, removePizzaFromCart} from "../../redux/slices/cartSlice";
interface Props{
    pizza:ICartPizza
}
const CartItem = ({pizza}:Props) => {
    const dispatch = useAppDispatch()
    return (
        <div className={styles.cart__item}>
            <img className={styles.pizzaBlock__img}
                 src={pizza.image}
                 alt="Pizza"/>
            <div className={styles.cartItem__info}>
                <h3>{pizza.title}</h3>
                <p>{pizza.type}, {pizza.size} см.</p>
            </div>
            <div className={styles.cartItem__count}>
                <button className={pizza.count <= 1 ? styles.disabled : ""}
                        disabled={ pizza.count <= 1 && true}
                        onClick={()=>dispatch(pizzaCountMinus(pizza))}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"></path>
                    </svg>
                </button>
                <b>{pizza.count}</b>
                <button onClick={()=>dispatch(pizzaCountPlus(pizza))}
                    className="button button--outline button--circle cart__item-count-plus">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"></path>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"></path>
                    </svg>
                </button>
            </div>
            <div className={styles.cartItem__price}><b>{pizza.price} ₴</b></div>
            <div onClick={()=>dispatch(removePizzaFromCart(pizza))}
                className={styles.cartItem__remove}>
                <div className="button button--outline button--circle">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"></path>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CartItem;