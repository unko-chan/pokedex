import React, { useState } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

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

  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  if (page <= 3) {
    endPage = Math.min(totalPages, 5);
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
