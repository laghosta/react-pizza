import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortPropertyEnum, TSort, IInitialFilterState} from '../types'

export interface FilterSliceState {
    searchValue: string;
    CategoryIndex: number;
    CurrentPage: number;
    sortBy: TSort;
}

const initialState:IInitialFilterState = {
    searchValue: "",
    CategoryIndex: 0,
    CurrentPage: 1,
    sortBy: {
        name : "популярности (DESC)",
        sortProperty : SortPropertyEnum.RATING_DESC
    },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        SetSelectedCategoryIndex(state, action: PayloadAction<number>) {
            state.CategoryIndex = Number(action.payload)
        },
        SetSortBy(state, action: PayloadAction<TSort>) {
            state.sortBy = action.payload
        },
        SetSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        SetCurrentPage(state, action: PayloadAction<number>) {
            state.CurrentPage = Number(action.payload)
        },
        SetFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.CurrentPage = Number(action.payload.CurrentPage);
                state.CategoryIndex = Number(action.payload.CategoryIndex);
                state.sortBy = action.payload.sortBy;
            } else {
                state.CurrentPage = 1;
                state.CategoryIndex = 0;
                state.sortBy = {
                    name: 'популярности (DESC)',
                    sortProperty: SortPropertyEnum.RATING_DESC,
                };
            }
        }
    }

})
export const { SetFilters, SetSelectedCategoryIndex, SetSortBy, SetSearchValue, SetCurrentPage} = filterSlice.actions
export default filterSlice.reducer