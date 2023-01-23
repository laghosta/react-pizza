import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState{
    searchValue :string,
    selectedCategoryIndex:number,
    currentPage:number,
    sortBy:number
}

const initialState:IInitialState = {
    searchValue: "",
    selectedCategoryIndex: 0,
    currentPage:1,
    sortBy : 0,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        SetSelectedCategoryIndex(state, action:PayloadAction<number>){
            state.selectedCategoryIndex = action.payload
        },
        SetSortBy(state, action:PayloadAction<number>){
            state.sortBy = action.payload
        },
        SetSearchValue(state, action:PayloadAction<string>){
            state.searchValue = action.payload
        },
        SetCurrentPage(state, action:PayloadAction<number>){
            state.currentPage = action.payload
        }
    },

})
export const {SetSelectedCategoryIndex, SetSortBy,SetSearchValue, SetCurrentPage} = filterSlice.actions
export default filterSlice.reducer