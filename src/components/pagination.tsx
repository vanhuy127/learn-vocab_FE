import { memo, useCallback, useMemo } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = useCallback(() => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  const pages = useMemo(() => getPageNumbers(), [getPageNumbers]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage) onPageChange(page);
    },
    [onPageChange, currentPage],
  );

  return (
    <div className="flex items-center justify-end gap-4 sm:flex-row">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="border-2 hover:border-cyan-300 hover:bg-cyan-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Trước
        </Button>

        <div className="flex items-center gap-1">
          {pages.map((page, idx) =>
            page === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-sm text-gray-500">
                ...
              </span>
            ) : (
              <Button
                key={idx}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white'
                    : 'border-2 hover:border-cyan-300 hover:bg-cyan-50'
                }
              >
                {page}
              </Button>
            ),
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="border-2 hover:border-cyan-300 hover:bg-cyan-50"
        >
          Sau
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default memo(Pagination);
