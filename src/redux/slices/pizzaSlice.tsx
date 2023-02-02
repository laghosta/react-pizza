import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IInitialPizzaState, Pizza} from "../types";

const initialState:IInitialPizzaState = {
    pizzas: [],
    isLoading : true
}
const pizzaSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers:{
        setItems(state, action:PayloadAction<Pizza[]>){
            state.pizzas = action.payload
            state.isLoading = false
        }
    }

})

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer