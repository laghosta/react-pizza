export enum SortPropertyEnum {
    RATING_DESC = '-rating',
    RATING_ASC = 'rating',
    TITLE_DESC = '-title',
    TITLE_ASC = 'title',
    PRICE_DESC = '-price',
    PRICE_ASC = 'price',
}
export interface Pizza {
    id: number;
    title: string;
    image: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number
}
export type TSort = {
    name: string;
    sortProperty: SortPropertyEnum;
};
export interface IInitialFilterState {
    searchValue: string,
    CategoryIndex: number,
    CurrentPage: number,
    sortBy: TSort
}
export interface IInitialPizzaState{
    pizzas: Pizza[],
    isLoading: boolean
}
export interface IqsAttr{
    CategoryIndex:number,
    SortBy:TSort,
    CurrentPage:number
}
