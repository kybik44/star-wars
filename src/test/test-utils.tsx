import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { AllTheProviders } from "./providers";
import { createTestQueryClient } from "./utils";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export specific functions from testing-library instead of using export *
export {
  screen,
  fireEvent,
  waitFor,
  act,
  renderHook,
  within,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";

export { customRender as render };

export { createTestQueryClient };
