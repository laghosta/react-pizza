import React from 'react';
import styles from "./pagination.module.scss"
import ReactPaginate from "react-paginate";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {SetCurrentPage} from "../../redux/slices/filterSlice";

const Pagination = () => {
    const currentPage = useAppSelector(state => state.filter.CurrentPage)
    const dispatch = useAppDispatch()

    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e)=>dispatch(SetCurrentPage(e.selected +1))}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
        />

    );
};

export default Pagination;