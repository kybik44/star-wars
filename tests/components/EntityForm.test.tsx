import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import EntityForm from "../../src/features/entity/ui/EntityForm/EntityForm";
import type { EntityType } from "../../src/types";

vi.mock("@constants/entityConfigs", () => ({
  getEntityConfig: vi.fn((entityType: EntityType) => ({
    type: entityType,
    name: entityType === "characters" ? "Character" : "Film",
    pluralName: entityType === "characters" ? "Characters" : "Films",
    formFields:
      entityType === "characters"
        ? [
            {
              key: "name",
              label: "Name",
              type: "text",
              required: true,
            },
            {
              key: "height",
              label: "Height (cm)",
              type: "text",
              required: true,
            },
          ]
        : [
            {
              key: "title",
              label: "Title",
              type: "text",
              required: true,
            },
          ],
  })),
}));

vi.mock("@/shared", () => ({
  ButtonsGroup: vi.fn(({ buttons }) => (
    <div data-testid="buttons-group">
      {buttons.map((button: Record<string, unknown>, index: number) => (
        <button
          key={index}
          onClick={button.onClick as () => void}
          disabled={button.disabled as boolean}
          data-testid={`button-${(button.label as string)
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {button.label as string}
        </button>
      ))}
    </div>
  )),
  createValidationSchema: vi.fn(() => {
    const mockSchema = {
      parse: vi.fn((data) => data),
      safeParse: vi.fn((data) => ({ success: true, data })),
      _def: { typeName: "ZodObject" },
      shape: {},
      refine: vi.fn(() => mockSchema),
      transform: vi.fn(() => mockSchema),
      pipe: vi.fn(() => mockSchema),
      optional: vi.fn(() => mockSchema),
      nullable: vi.fn(() => mockSchema),
      nullish: vi.fn(() => mockSchema),
      array: vi.fn(() => mockSchema),
      promise: vi.fn(() => mockSchema),
      or: vi.fn(() => mockSchema),
      union: vi.fn(() => mockSchema),
      intersection: vi.fn(() => mockSchema),
      merge: vi.fn(() => mockSchema),
      pick: vi.fn(() => mockSchema),
      omit: vi.fn(() => mockSchema),
      partial: vi.fn(() => mockSchema),
      deepPartial: vi.fn(() => mockSchema),
      required: vi.fn(() => mockSchema),
      superRefine: vi.fn(() => mockSchema),
      safeParseAsync: vi.fn(async (data) => ({ success: true, data })),
      parseAsync: vi.fn(async (data) => data),
    };
    return mockSchema;
  }),
}));

vi.mock("../../src/features/entity/ui/EntityForm/FormField", () => ({
  default: vi.fn(({ field }) => (
    <div data-testid={`field-${field.key}`}>
      <label>{field.label}</label>
      <input data-testid={`input-${field.key}`} />
    </div>
  )),
}));

describe("EntityForm", () => {
  const mockEntity = {
    name: "Luke Skywalker",
    height: "172",
  };

  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  const renderEntityForm = (props = {}) => {
    return render(
      <EntityForm
        entityType="characters"
        entity={mockEntity}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        {...props}
      />
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("should render form with entity type name", () => {
    renderEntityForm();

    expect(screen.getByText("Edit Character")).toBeInTheDocument();
    expect(
      screen.getByText(/Make changes to character information/)
    ).toBeInTheDocument();
  });

  it("should render form fields based on entity config", () => {
    renderEntityForm();

    expect(screen.getByTestId("field-name")).toBeInTheDocument();
    expect(screen.getByTestId("field-height")).toBeInTheDocument();
  });

  it("should show info alert when no changes made", () => {
    renderEntityForm();

    expect(
      screen.getByText(/No changes have been made to the character data/)
    ).toBeInTheDocument();
  });

  it("should render save and cancel buttons", () => {
    renderEntityForm();

    expect(screen.getByTestId("button-cancel")).toBeInTheDocument();
    expect(screen.getByTestId("button-save-changes")).toBeInTheDocument();
  });

  it("should call onCancel when cancel button clicked", () => {
    renderEntityForm();

    const cancelButton = screen.getByTestId("button-cancel");
    act(() => {
      fireEvent.click(cancelButton);
    });

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("should render different entity types correctly", () => {
    render(
      <EntityForm
        entityType="films"
        entity={{ title: "A New Hope" }}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText("Edit Film")).toBeInTheDocument();
    expect(
      screen.getByText(/Make changes to film information/)
    ).toBeInTheDocument();
  });

  it("should handle empty entity data", () => {
    render(
      <EntityForm
        entityType="characters"
        entity={{}}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText("Edit Character")).toBeInTheDocument();
    expect(screen.getByTestId("field-name")).toBeInTheDocument();
  });

  it("should render form with proper structure", () => {
    renderEntityForm();

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Height (cm)")).toBeInTheDocument();
    expect(screen.getByTestId("buttons-group")).toBeInTheDocument();
  });
});
