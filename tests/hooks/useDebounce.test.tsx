import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../../src/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should debounce search input", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "", delay: 300 },
      }
    );

    expect(result.current).toBe("");

    act(() => {
      rerender({ value: "a", delay: 300 });
    });
    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("a");
  });

  it("should cancel previous requests", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "", delay: 300 },
      }
    );

    act(() => {
      rerender({ value: "a", delay: 300 });
    });
    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("");

    act(() => {
      rerender({ value: "ab", delay: 300 });
    });
    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("ab");
  });

  it("should handle rapid input changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "", delay: 500 },
      }
    );

    act(() => {
      rerender({ value: "a", delay: 500 });
    });
    act(() => {
      rerender({ value: "ab", delay: 500 });
    });
    act(() => {
      rerender({ value: "abc", delay: 500 });
    });
    act(() => {
      rerender({ value: "abcd", delay: 500 });
    });

    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("abcd");
  });

  it("should work with different delay values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "", delay: 100 },
      }
    );

    act(() => {
      rerender({ value: "test", delay: 100 });
    });
    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("test");

    act(() => {
      rerender({ value: "new value", delay: 1000 });
    });
    expect(result.current).toBe("test");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe("new value");
  });

  it("should handle immediate value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 300 },
      }
    );

    expect(result.current).toBe("initial");

    act(() => {
      rerender({ value: "changed", delay: 300 });
    });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("changed");
  });

  it("should handle zero delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "", delay: 0 },
      }
    );

    act(() => {
      rerender({ value: "immediate", delay: 0 });
    });

    act(() => {
      vi.runAllTimers();
    });
    expect(result.current).toBe("immediate");
  });

  it("should handle negative delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "", delay: -100 },
      }
    );

    act(() => {
      rerender({ value: "negative", delay: -100 });
    });

    act(() => {
      vi.runAllTimers();
    });
    expect(result.current).toBe("negative");
  });

  it("should cleanup timeout on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

    const { unmount, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "", delay: 300 },
      }
    );

    act(() => {
      rerender({ value: "test", delay: 300 });
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });

  it("should handle multiple rapid changes and only update with last value", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "", delay: 200 },
      }
    );

    const values = ["a", "ab", "abc", "abcd", "abcde"];

    values.forEach((value, index) => {
      act(() => {
        rerender({ value, delay: 200 });
      });

      if (index < values.length - 1) {
        act(() => {
          vi.advanceTimersByTime(50);
        });
      }
    });

    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("abcde");
  });
});
