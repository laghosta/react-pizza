import React from 'react';
import './App.css';
import {
    Routes,
    Route,
} from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
interface ISearchContext {
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = React.createContext<ISearchContext>({} as ISearchContext )
function App() {
    const [searchValue, setSearchValue] = React.useState("")
    return (
        <div className="App">
        <SearchContext.Provider value={{searchValue,setSearchValue }}>
            <div className="wrapper">
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/cart' element={<Cart />}/>
                    <Route path='*' element={<NotFound />}/>
                </Routes>
            </div>
        </SearchContext.Provider>
</div>
    );
}

export default App;
