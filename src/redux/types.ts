export enum SortPropertyEnum {
    RATING_DESC = '-rating',
    RATING_ASC = 'rating',
    TITLE_DESC = '-title',
    TITLE_ASC = 'title',
    PRICE_DESC = '-price',
    PRICE_ASC = 'price',
}
export type TSort = {
    name: string;
    sortProperty: SortPropertyEnum;
};
export interface IInitialState {
    searchValue: string,
    CategoryIndex: number,
    CurrentPage: number,
    sortBy: TSort
}