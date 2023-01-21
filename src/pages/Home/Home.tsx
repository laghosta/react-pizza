import React from 'react';
import styles from './pizzas.module.scss'
import PizzaItem from "../../components/PizzaItem/PizzaItem";
import Skeleton from "../../components/PizzaItem/Skeleton";
import axios from "axios";
import ContentTop from "../../components/ContentTop/ContentTop";
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import ReactPaginate from "react-paginate";
import {SearchContext} from "../../App";

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

interface ISortContext {
    sort: string[],
    sortBy: number,
    setSortBy: React.Dispatch<React.SetStateAction<number>>,
    selectedCategoryIndex:number,
    setSelectedCategoryIndex:React.Dispatch<React.SetStateAction<number>>,


}
export const SortContext = React.createContext<ISortContext>({} as ISortContext)

const Home = () => {
    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0)
    const [sortBy, setSortBy] = React.useState(0)
    const [currentPage, setCurrentPage] = React.useState(1)
    const {searchValue} = React.useContext(SearchContext)
    const sort: string[] = ['популярности (DESC)', 'популярности (ASC)', 'цене (DESC)', 'цене (ASC)', 'алфавиту (DESC)', 'алфавиту (ASC)']
    const sortLinkList = [
        'sortBy=rating&order=desc',
        'sortBy=rating&order=asc',
        'sortBy=price&order=desc',
        'sortBy=price&order=asc',
        'sortBy=title&order=desc',
        'sortBy=title&order=asc',
    ]
    React.useEffect(() => {
        axios.get(`https://63618928af66cc87dc2dd4a5.mockapi.io/pizzas?page=${currentPage}&limit=4&${selectedCategoryIndex !== 0 
            ? "&category=" + selectedCategoryIndex+"&" 
            : "&"}${sortLinkList[sortBy]}`)
            .then(el => {
                setPizzas(el.data)
                setIsLoading(false)

            })
    }, [selectedCategoryIndex, sortBy, currentPage])
    window.scrollTo(0, 0)
    return (
        <div className={styles.pizza__block}>
            <SortContext.Provider value={{sort, sortBy, setSortBy, selectedCategoryIndex, setSelectedCategoryIndex}}>
                <ContentTop/>
            </SortContext.Provider>
            <h1>
                Все пиццы
            </h1>
            <ul className={styles.pizza_list}>
                {
                    isLoading
                        ? [...new Array(4)].map((el, id) => <Skeleton key={id}/>)
                        : pizzas.filter((pizza:Pizza)=>pizza.title.toLowerCase()
                                .includes(searchValue))
                                .map((el:Pizza, id)=>
                            <PizzaItem
                                key={id}
                                pizza = {el}
                            /> )

                }
            </ul>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    );
};

export default Home;