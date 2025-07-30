/**
 * Calculate total pages from count and page size
 */
export function getTotalPages(count: number, pageSize: number = 10): number {
  return Math.ceil(count / pageSize);
}

/**
 * Extract current page number from pagination URLs
 */
export function getCurrentPage(next: string | null, previous: string | null): number {
  if (next) {
    const match = next.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) - 1 : 1;
  }

  if (previous) {
    const match = previous.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) + 1 : 1;
  }

  return 1;
}

/**
 * Check if pagination has next page
 */
export function hasNextPage(next: string | null): boolean {
  return next !== null;
}

/**
 * Check if pagination has previous page
 */
export function hasPreviousPage(previous: string | null): boolean {
  return previous !== null;
}

/**
 * Extract page number from URL
 */
export function extractPageFromUrl(url: string | null): number | null {
  if (!url) return null;
  
  const match = url.match(/page=(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Calculate pagination info from API response
 */
export function calculatePaginationInfo(
  count: number,
  next: string | null,
  previous: string | null,
  pageSize: number = 10
) {
  return {
    currentPage: getCurrentPage(next, previous),
    totalPages: getTotalPages(count, pageSize),
    hasNext: hasNextPage(next),
    hasPrevious: hasPreviousPage(previous),
    totalCount: count,
  };
}