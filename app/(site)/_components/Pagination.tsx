"use client";

import React, { FC } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (pageNumber: number) => void;
}

const MAX_PAGE_NUMBERS = 5;

const Pagination: FC<PaginationProps> = ({ page, totalPages, setPage }) => {
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
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
          onClick={() => goToPage(pageNumber)}
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
