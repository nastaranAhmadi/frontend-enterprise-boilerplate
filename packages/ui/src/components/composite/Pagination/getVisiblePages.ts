export type PaginationItem = number | 'ellipsis';

const range = (start: number, end: number): number[] => {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const getVisiblePages = (
  page: number,
  totalPages: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationItem[] => {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2;

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, boundaryCount);
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages - boundaryCount + 1);

  const shouldShowLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - boundaryCount - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    return [
      ...range(1, leftItemCount),
      'ellipsis',
      ...range(totalPages - boundaryCount + 1, totalPages),
    ];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    return [
      ...range(1, boundaryCount),
      'ellipsis',
      ...range(totalPages - rightItemCount + 1, totalPages),
    ];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    return [
      ...range(1, boundaryCount),
      'ellipsis',
      ...range(leftSiblingIndex, rightSiblingIndex),
      'ellipsis',
      ...range(totalPages - boundaryCount + 1, totalPages),
    ];
  }

  return range(1, totalPages);
};
