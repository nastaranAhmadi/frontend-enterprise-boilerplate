import { useEffect, useMemo } from 'react';

import { Button } from '../../base/Button';
import { getVisiblePages } from './getVisiblePages';
import {
  getPaginationEllipsisClassName,
  getPaginationItemsClassName,
  getPaginationRootClassName,
} from './Pagination.styles';
import type { PaginationProps } from './Pagination.types';

const clampPage = (page: number, totalPages: number): number => {
  if (totalPages <= 0) return 1;
  return Math.min(Math.max(page, 1), totalPages);
};

const getPaginationNavIcons = (isRtl: boolean) => ({
  first: isRtl ? '»' : '«',
  previous: isRtl ? '›' : '‹',
  next: isRtl ? '‹' : '›',
  last: isRtl ? '«' : '»',
});

export const Pagination = function Pagination(props: PaginationProps) {
  const {
    page,
    totalPages,
    onPageChange,
    disabled = false,
    siblingCount = 1,
    boundaryCount = 1,
    size,
    className,
    showFirstLast = true,
    'aria-label': ariaLabel = 'Pagination',
    renderPageLabel,
    dir,
    ...paginationProps
  } = props;

  const currentPage = clampPage(page, totalPages);
  const isDisabled = disabled || totalPages <= 1;
  const isRtl = dir === 'rtl';
  const navIcons = getPaginationNavIcons(isRtl);
  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, totalPages, siblingCount, boundaryCount),
    [boundaryCount, currentPage, siblingCount, totalPages],
  );

  useEffect(() => {
    if (totalPages <= 0) return;
    const resolvedPage = clampPage(page, totalPages);
    if (page !== resolvedPage) {
      onPageChange(resolvedPage);
    }
  }, [onPageChange, page, totalPages]);

  const goToPage = (nextPage: number) => {
    if (isDisabled) return;
    const resolvedPage = clampPage(nextPage, totalPages);
    if (resolvedPage !== currentPage) {
      onPageChange(resolvedPage);
    }
  };

  const navButtonProps = {
    size,
    variant: 'outlined' as const,
    disabled: isDisabled,
  };

  return (
    <nav
      {...paginationProps}
      dir={dir}
      className={getPaginationRootClassName({ size, className })}
      aria-label={ariaLabel}
    >
      {showFirstLast ? (
        <Button
          {...navButtonProps}
          aria-label="First page"
          disabled={isDisabled || currentPage <= 1}
          onClick={() => {
            goToPage(1);
          }}
        >
          {navIcons.first}
        </Button>
      ) : null}

      <Button
        {...navButtonProps}
        aria-label="Previous page"
        disabled={isDisabled || currentPage <= 1}
        onClick={() => {
          goToPage(currentPage - 1);
        }}
      >
        {navIcons.previous}
      </Button>

      <div className={getPaginationItemsClassName({ size })}>
        {visiblePages.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${String(index)}`}
                aria-hidden="true"
                className={getPaginationEllipsisClassName({ size })}
              >
                …
              </span>
            );
          }

          const isCurrentPage = item === currentPage;

          return (
            <Button
              key={item}
              {...navButtonProps}
              variant={isCurrentPage ? 'filled' : 'outlined'}
              aria-label={`Page ${String(item)}`}
              aria-current={isCurrentPage ? 'page' : undefined}
              disabled={isDisabled}
              onClick={() => {
                goToPage(item);
              }}
            >
              {renderPageLabel ? renderPageLabel(item) : item}
            </Button>
          );
        })}
      </div>

      <Button
        {...navButtonProps}
        aria-label="Next page"
        disabled={isDisabled || currentPage >= totalPages}
        onClick={() => {
          goToPage(currentPage + 1);
        }}
      >
        {navIcons.next}
      </Button>

      {showFirstLast ? (
        <Button
          {...navButtonProps}
          aria-label="Last page"
          disabled={isDisabled || currentPage >= totalPages}
          onClick={() => {
            goToPage(totalPages);
          }}
        >
          {navIcons.last}
        </Button>
      ) : null}
    </nav>
  );
};

Pagination.displayName = 'Pagination';
