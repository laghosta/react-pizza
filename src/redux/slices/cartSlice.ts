import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartPizza} from "../../components/PizzaItem/PizzaItem";

interface IInitialState {
    cartValue: ICartPizza[],
    pizzasCount: number,
    sum: number
}

const initialState: IInitialState = {
    cartValue: [],
    pizzasCount: 0,
    sum: 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart(state, action: PayloadAction<ICartPizza>) {
            let pizza = state.cartValue.find(el => el.id === action.payload.id && el.type === action.payload.type && el.size === action.payload.size)
            if (pizza !== undefined) {
                pizza.count += 1
            }
            else {
                state.cartValue.push({
                    ...action.payload,
                    count: 1
                })
            }
        },
        removePizzaFromCart(state, action: PayloadAction<ICartPizza>){
            if (window.confirm("Вы действительно хотите удалить эту пиццу из корзины?")){
                state.cartValue = state.cartValue.filter(el=>el.id !== action.payload.id || el.type !== action.payload.type || el.size !== action.payload.size)
            }
        },
        calcCartPizzasCount(state) {
            state.pizzasCount = 0
            state.cartValue.forEach(el => state.pizzasCount += el.count)
        },
        calcCartPizzasPrice(state) {
            state.sum = 0
            state.cartValue.forEach(el => state.sum += (el.price * el.count))
        },
        clearCart(state) {
            if (state.cartValue.length){
                if (window.confirm("Вы действительно хотите очистить корзину?")){
                    state.cartValue = []
                }
            }
            else {
                alert("Корзина и так пустая")
            }

        },
        pizzaCountPlus(state, action: PayloadAction<ICartPizza>){
            let pizza = state.cartValue.find(el => el.id === action.payload.id && el.type === action.payload.type && el.size === action.payload.size)
            pizza!.count++
            state.pizzasCount++
        },
        pizzaCountMinus(state, action: PayloadAction<ICartPizza>){
            let pizza = state.cartValue.find(el => el.id === action.payload.id && el.type === action.payload.type && el.size === action.payload.size)
            if(pizza!.count > 1){
                pizza!.count--
                state.pizzasCount--
            }
        },

    }
})
export const {removePizzaFromCart,addItemToCart, pizzaCountPlus, pizzaCountMinus,calcCartPizzasCount, calcCartPizzasPrice, clearCart} = cartSlice.actions

export default cartSlice.reducer
