import React from 'react';
import styles from './PizzaItem.module.scss'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {addItemToCart,} from '../../redux/slices/cartSlice'
interface Props {
    pizza:{
        id: number;
        title: string;
        image: string;
        price: number;
        sizes: number[];
        types: number[];
        rating: number
    }

}
export interface ICartPizza {
    key? : number;
    id: number;
    title: string;
    image: string;
    price: number;
    size: number;
    type: string;
    count : number
}
const PizzaItem = ({pizza}: Props) => {
    const dispatch = useAppDispatch()
    const pizzas = useAppSelector(state=> state.cart.cartValue)
    const [pizzaCount, setPizzaCount] = React.useState(0)
    const [pizzaSizeIndex, setPizzaSizeIndex] = React.useState(0)
    const [pizzaTypeIndex, setPizzaTypeIndex] = React.useState(0)
    const dough = ["тонкое", "традиционное"]

    const onClickAdd = () => {
        setPizzaCount(pizzaCount+1)
        handlePizzasCount()
        let item: ICartPizza = {
            id: pizza.id,
            title : pizza.title,
            price : pizza.price,
            image : pizza.image,
            type: dough[pizzaTypeIndex],
            size: pizza.sizes[pizzaSizeIndex],
            count: pizzaCount,
        };
        dispatch(addItemToCart(item));

    };

    const handlePizzasCount = () => {
        if(pizzas.find(el=> el.id === pizza.id) !== undefined){
            return (pizzas.find(el=> el.id === pizza.id))!.count
        }
        else{
           return 0
        }
    }

    return (
        <div className={styles.pizza}>
            <img width="260px" height="260px" src={`${pizza.image}`} alt=""/>
            <h4>{pizza.title}</h4>
            <ul className={styles.pizza__dough}>
                {
                    pizza.types.map((el, id) =>
                        <li onClick={() => setPizzaTypeIndex(id)}
                            className={pizzaTypeIndex === id ? styles.active : ''} key={id}>{dough[el]}</li>
                    )
                }
            </ul>
            <ul className={styles.pizza__size}>
                {
                    pizza.sizes.map((el, id) =>
                        <li key={id} onClick={() => setPizzaSizeIndex(id)}
                            className={pizzaSizeIndex === id ? styles.active : ""}>{`${el} см.`}</li>
                    )
                }
            </ul>
            <div className={styles.pizza__bottom}>
                <div className={styles.pizza__price}>от {pizza.price} ₴</div>
                <button onClick={onClickAdd} className={styles.pizza__addBtn}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"></path>
                    </svg>
                    <span >Добавить</span>
                </button>
            </div>

        </div>
    );
};

export default PizzaItem;