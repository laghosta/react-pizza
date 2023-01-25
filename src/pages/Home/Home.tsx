import React, {useRef} from 'react';
import styles from './pizzas.module.scss'
import PizzaItem from "../../components/PizzaItem/PizzaItem";
import Skeleton from "../../components/PizzaItem/Skeleton";
import axios from "axios";
import ContentTop from "../../components/ContentTop/ContentTop";
import Pagination from "../../components/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SetCurrentPage} from '../../redux/slices/filterSlice'
import PizzasNotFound from "../../components/PizzasNotFound/PizzaNotFound";
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
    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const sortLinkList = [
        'sortBy=rating&order=desc',
        'sortBy=rating&order=asc',
        'sortBy=price&order=desc',
        'sortBy=price&order=asc',
        'sortBy=title&order=desc',
        'sortBy=title&order=asc',
    ]
    const CategoryIndex = useAppSelector(state => state.filter.selectedCategoryIndex)
    const SortBy = useAppSelector(state => state.filter.sortBy)
    const SearchValue = useAppSelector(state => state.filter.searchValue)
    const CurrentPage = useAppSelector(state => state.filter.currentPage)
    const dispatch = useAppDispatch()
    const pizzasList = useRef<HTMLUListElement>(null)
    React.useEffect(() => {
        axios.get(`https://63618928af66cc87dc2dd4a5.mockapi.io/pizzas?page=${CurrentPage}&limit=4&${CategoryIndex !== 0 
            ? `&category=${CategoryIndex}&`
            : "&"}${sortLinkList[SortBy]}`)
            .then(el => {
                setPizzas(el.data)
                setIsLoading(false)
            })
    }, [CategoryIndex, SortBy, CurrentPage])
    window.scrollTo(0, 0)

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
            <Pagination onChangePage={(number)=>dispatch(SetCurrentPage(number))}/>
        </div>
    );
};

export default Home;