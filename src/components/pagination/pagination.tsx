import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/button"; // Component path.
import { containerStyle } from "./pagination.css";
import { DOTS, usePaginationRange } from "./use-pagination";

export interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  className,
}: PaginationProps) => {
  const paginationRange = usePaginationRange({
    currentPage,
    totalCount,
    pageSize,
    siblingCount: 1,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);
  const lastPage = paginationRange
    ? paginationRange[paginationRange.length - 1]
    : 0;

  return (
    <nav className={clsx(containerStyle, className)} aria-label="Pagination">
      {/* Previous button. */}
      <IconButton
        onPress={onPrevious}
        isDisabled={currentPage === 1}
        variant="standard"
        shape="rounded"
        color="neutral"
        aria-label="Previous page"
        size="sm"
      >
        <ChevronLeft />
      </IconButton>

      {/* Page numbers. */}
      {paginationRange?.map((pageNumber, index) => {
        // Render an ellipsis.
        if (pageNumber === DOTS) {
          return (
            <IconButton
              key={`dots-${paginationRange[index - 1] || "start"}-${paginationRange[index + 1] || "end"}`}
              isDisabled
              variant="standard"
              shape="square"
              aria-label="more pages"
              size="sm"
            >
              {"\u2026"}
            </IconButton>
          );
        }

        const isSelected = pageNumber === currentPage;

        return (
          <IconButton
            key={pageNumber}
            onPress={() => onPageChange(Number(pageNumber))}
            variant={isSelected ? "filled" : "tonal"}
            color={isSelected ? "primary" : "neutral"}
            size="sm"
            // Change the shape here if square page buttons are preferred.
            shape="rounded"
            aria-label={`Page ${pageNumber}`}
          >
            {pageNumber}
          </IconButton>
        );
      })}

      {/* Next button. */}
      <IconButton
        onPress={onNext}
        isDisabled={currentPage === lastPage}
        variant="standard"
        color="neutral"
        aria-label="Next page"
        shape="rounded"
        size="sm"
      >
        <ChevronRight />
      </IconButton>
    </nav>
  );
};
