import React, {useRef} from 'react';
import styles from './pizzas.module.scss'
import PizzaItem from "../../components/PizzaItem/PizzaItem";
import Skeleton from "../../components/PizzaItem/Skeleton";
import axios from "axios";
import ContentTop from "../../components/ContentTop/ContentTop";
import Pagination from "../../components/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SetCurrentPage, SetFilters} from '../../redux/slices/filterSlice'
import PizzasNotFound from "../../components/PizzasNotFound/PizzaNotFound";
import {useNavigate} from "react-router-dom";
import {sortList} from "../../components/Sort/Sort";
interface Pizza {
    id: number;
    title: string;
    image: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number
}

const Home = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    let qs = require("qs")
    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const CategoryIndex = useAppSelector(state => state.filter.CategoryIndex)
    const SortBy = useAppSelector(state => state.filter.sortBy)
    const SearchValue = useAppSelector(state => state.filter.searchValue)
    const CurrentPage = useAppSelector(state => state.filter.CurrentPage)
    const pizzasList = useRef<HTMLUListElement>(null)

    React.useEffect(()=>{
        if(window.location.search){
            const params = qs.parse(window.location.search.substring(1))
            const sortBy = sortList.find((obj)=> obj.sortProperty === params.sortProperty )
            dispatch(SetCurrentPage(params.CurrentPage))
            console.log(params.sortProperty)
            console.log(params.CategoryIndex);
            dispatch(SetFilters({
                ...params,
                sortBy
            }))
        }
        else{
            console.log("sauntre")
        }
    },[])

    React.useEffect(() => {
        axios.get(`https://63618928af66cc87dc2dd4a5.mockapi.io/pizzas?page=${CurrentPage}&limit=4&${CategoryIndex !== 0 
            ? `&category=${CategoryIndex}&`
            : "&"}sortBy=${SortBy.sortProperty[0] === "-" ? SortBy.sortProperty.substring(1) : SortBy.sortProperty }&order=${SortBy.sortProperty[0] === "-" ? "desc" : "asc"}`)
            .then(el => {
                setPizzas(el.data)
                setIsLoading(false)
            })
    }, [CategoryIndex, SortBy, CurrentPage])
    window.scrollTo(0, 0)
    React.useEffect(()=>{
        const queryStr = qs.stringify({
            sortProperty: SortBy.sortProperty,
            CategoryIndex,
            CurrentPage,
        })
        nav(`?${queryStr}`)
    }, [CategoryIndex, SortBy, CurrentPage, window.location.search])
    function PizzaRender(){
        if(pizzas.filter((pizza:Pizza)=>pizza.title.toLowerCase()
            .includes(SearchValue)).length){
            pizzasList.current?.classList.add(styles.pizza_list)
            return  pizzas.filter((pizza:Pizza)=>pizza.title.toLowerCase()
                .includes(SearchValue)).map((el:Pizza, id)=>
                <PizzaItem
                    key={id}
                    pizza = {el}
                />)
        }
        else{
            pizzasList.current?.classList.remove(styles.pizza_list)
            return <PizzasNotFound/>
        }
    }
    return (
        <div className={styles.pizza__block}>
            <ContentTop/>
            <h1>
                Все пиццы
            </h1>
            <ul ref={pizzasList} className={styles.pizza_list}>
                {
                    isLoading
                        ? [...new Array(4)].map((el, id) => <Skeleton key={id}/>)
                        : PizzaRender()
                }
            </ul>
            <Pagination/>
        </div>
    );
};

export default Home;