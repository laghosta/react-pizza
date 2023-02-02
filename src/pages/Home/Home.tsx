import React, {useRef} from 'react';
import styles from './pizzas.module.scss'
import PizzaItem from "../../components/PizzaItem/PizzaItem";
import Skeleton from "../../components/PizzaItem/Skeleton";
import ContentTop from "../../components/ContentTop/ContentTop";
import Pagination from "../../components/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SetCurrentPage, SetFilters} from '../../redux/slices/filterSlice'
import PizzasNotFound from "../../components/PizzasNotFound/PizzaNotFound";
import {useNavigate} from "react-router-dom";
import {sortList} from "../../components/Sort/Sort";
import {calcCartPizzasCount, calcCartPizzasPrice} from "../../redux/slices/cartSlice";
import {Pizza} from "../../redux/types";
import fetchPizzas from "../../redux/asyncAction";
import {setItems} from "../../redux/slices/pizzaSlice";
let qs = require("qs")


const Home = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const CategoryIndex = useAppSelector(state => state.filter.CategoryIndex)
    const SortBy = useAppSelector(state => state.filter.sortBy)
    const SearchValue = useAppSelector(state => state.filter.searchValue)
    const CurrentPage = useAppSelector(state => state.filter.CurrentPage)
    const pizzasList = useRef<HTMLUListElement>(null)
    const cartPizzas = useAppSelector(state => state.cart.cartValue)
    const pizzasCount = useAppSelector(state => state.cart.pizzasCount)
    const pizzas = useAppSelector(state => state.pizzas.pizzas)
    const isLoading  = useAppSelector(state=> state.pizzas.isLoading)

    React.useEffect(()=>{
        fetchPizzas(
            {
                CategoryIndex,
                SortBy,
                CurrentPage
            }).then(res =>dispatch(setItems(res)))
    },[CategoryIndex, SortBy, CurrentPage])

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sortBy = sortList.find((obj) => obj.sortProperty === params.sortProperty)
            dispatch(SetCurrentPage(params.CurrentPage))
            dispatch(SetFilters({
                ...params,
                sortBy
            }))
            isSearch.current = true
        }
    }, [])
    React.useEffect(() => {
        dispatch(calcCartPizzasCount())
        dispatch(calcCartPizzasPrice())
    }, [cartPizzas, pizzasCount])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryStr = qs.stringify({
                sortProperty: SortBy.sortProperty,
                CategoryIndex,
                CurrentPage,
            })
            nav(`?${queryStr}`)
        }
        isMounted.current = true
    }, [CategoryIndex, SortBy, CurrentPage, window.location.search])

    function PizzaRender() {
        if (pizzas.filter((pizza: Pizza) => pizza.title.toLowerCase()
            .includes(SearchValue)).length) {
            pizzasList.current?.classList.add(styles.pizza_list)
            return pizzas.filter((pizza: Pizza) => pizza.title.toLowerCase()
                .includes(SearchValue)).map((el: Pizza, id) =>
                <PizzaItem
                    key={id}
                    pizza={el}
                />)
        } else {
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
                        :  PizzaRender()
                }
            </ul>
            <Pagination/>
        </div>
    );
};

export default Home;