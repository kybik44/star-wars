import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { server } from "./mocks/server";
import React from "react";
import "@testing-library/jest-dom";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock("@lottiefiles/react-lottie-player", () => ({
  Player: vi.fn(({ src, autoplay, loop, style, ...props }) => {
    return React.createElement("div", {
      "data-testid": "lottie-player",
      "data-src": src,
      "data-autoplay": autoplay,
      "data-loop": loop,
      style,
      ...props,
    });
  }),
}));

vi.mock("@mui/icons-material", () => ({
  default: vi.fn(() => "MockIcon"),
  Search: vi.fn(() => "SearchIcon"),
  Close: vi.fn(() => "CloseIcon"),
  ArrowBack: vi.fn(() => "ArrowBackIcon"),
  ArrowForward: vi.fn(() => "ArrowForwardIcon"),
  Settings: vi.fn(() => "SettingsIcon"),
  ...Object.fromEntries(
    Array.from({ length: 1000 }, (_, i) => [
      `Icon${i}`,
      vi.fn(() => `MockIcon${i}`),
    ])
  ),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
