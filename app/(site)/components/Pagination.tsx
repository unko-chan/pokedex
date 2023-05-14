import React, { useState } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const MAX_PAGE_NUMBERS = 5;

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  handlePageChange,
}) => {
  const previousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  // pages 1 to 3 dont need to be offset
  let startPage = Math.max(1, page - 2);

  let endPage = Math.min(totalPages, startPage + 4);

  if (page <= 3) {
    endPage = Math.min(totalPages, MAX_PAGE_NUMBERS);
  }

  if (page > totalPages - 2) {
    startPage = Math.max(1, totalPages - 4);
  }

  // pretty cool way to create an array of numbers
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#using_arrow_functions_and_array.from
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div>
      <button disabled={page === 1} onClick={previousPage}>
        Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          disabled={pageNumber === page}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button disabled={page === totalPages} onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
