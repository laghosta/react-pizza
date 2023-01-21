import React from 'react';
import styles from "./pagination.module.scss"
import ReactPaginate from "react-paginate";
interface Props{
    onChangePage(arg:number):any
}
const Pagination = ({onChangePage}:Props) => {

    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e)=>onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
        />

    );
};

export default Pagination;