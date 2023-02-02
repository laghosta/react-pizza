import axios from "axios";
import {IqsAttr, Pizza} from "./types";


const fetchPizzas = async ({CategoryIndex, SortBy, CurrentPage }:IqsAttr) =>{
    let {data} = await axios.get<Pizza[]>(`https://63618928af66cc87dc2dd4a5.mockapi.io/pizzas?page=${CurrentPage}&limit=4&${CategoryIndex !== 0
        ? `&category=${CategoryIndex}&`
        : "&"}sortBy=${SortBy.sortProperty[0] === "-" ? SortBy.sortProperty.substring(1) : SortBy.sortProperty }&order=${SortBy.sortProperty[0] === "-" ? "desc" : "asc"}`)
    return data
}
export default fetchPizzas