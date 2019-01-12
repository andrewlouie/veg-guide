import React from 'react';
import { PAGESIZE } from '../constants';

function Pagination(props) {
  if (props.totalResults > PAGESIZE) {
    var pages = Math.ceil(props.totalResults / PAGESIZE);
    var buttonNumbers = Array.apply(null, {length: pages}).map(Number.call, Number);
    return (
      <div className="Pagination">
        {
          buttonNumbers.map((page) => {
            if ((page + 1) * PAGESIZE < props.totalResults + PAGESIZE) {
              return (
                <button aria-label={`Go to page ${page + 1}`} className={`paginationButton${props.currentPage === page ? ' active' : ''}`} key={page} onClick={() => props.changePage(page) }>{page + 1}</button>
              )
            }
            return null;
          })
        }
      </div>
    )
  }
  return null;
}

export default Pagination;
