"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div className={cn({ invisible: page === 1 })}>
        <Button disabled={page === 1} onClick={previousPage}>
          Previous
        </Button>
      </div>
      <Separator orientation="vertical" />
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          disabled={pageNumber === page}
          onClick={() => goToPage(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <div className={cn({ invisible: page === totalPages })}>
        <Button disabled={page === totalPages} onClick={nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
