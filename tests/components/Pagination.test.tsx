import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PaginationSection from "../../src/features/entity/ui/Pagination/Pagination";
import type { PaginationInfo } from "../../src/types";

vi.mock("@hooks/useResponsive", () => ({
  useResponsive: () => ({
    isMobile: false,
    isTablet: false,
  }),
}));

describe("Pagination", () => {
  const mockPaginationInfo: PaginationInfo = {
    currentPage: 1,
    totalPages: 5,
    hasNext: true,
    hasPrevious: false,
    totalCount: 50,
  };

  const mockOnPageChange = vi.fn();

  const renderPagination = (props = {}) => {
    return render(
      <PaginationSection
        paginationInfo={mockPaginationInfo}
        currentPage={1}
        onPageChange={mockOnPageChange}
        {...props}
      />
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

    it("should render page numbers", () => {
    renderPagination();
    
    expect(screen.getByRole("button", { name: "page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to page 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to page 3" })).toBeInTheDocument();
  });

  it("should handle page changes", () => {
    renderPagination();

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it("should disable buttons when needed", () => {
    renderPagination({
      paginationInfo: {
        ...mockPaginationInfo,
        currentPage: 1,
        hasPrevious: false,
      },
      currentPage: 1,
    });

    const prevButton = screen.getAllByLabelText("Go to previous page")[0];
    expect(prevButton).toBeDisabled();
  });

  it("should show current page", () => {
    renderPagination({
      currentPage: 3,
      paginationInfo: {
        ...mockPaginationInfo,
        currentPage: 3,
      },
    });

    const currentPageButton = screen.getByRole("button", { name: "page 3" });
    expect(currentPageButton).toHaveAttribute("aria-current", "page");
  });

  it("should handle edge cases (first/last page)", () => {
    const { rerender } = renderPagination({
      paginationInfo: {
        ...mockPaginationInfo,
        currentPage: 1,
        hasPrevious: false,
      },
      currentPage: 1,
    });

    expect(screen.getAllByLabelText("Go to previous page")[0]).toBeDisabled();

    rerender(
      <PaginationSection
        paginationInfo={{
          ...mockPaginationInfo,
          currentPage: 5,
          hasNext: false,
        }}
        currentPage={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getAllByLabelText("Go to next page")[0]).toBeDisabled();
  });

  it("should not render when only one page", () => {
    const { container } = renderPagination({
      paginationInfo: {
        ...mockPaginationInfo,
        totalPages: 1,
      },
    });

    expect(container.firstChild).toBeNull();
  });

    it("should render pagination component", () => {
    renderPagination();
    
    expect(screen.getByRole("button", { name: "page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to page 2" })).toBeInTheDocument();
  });
});
