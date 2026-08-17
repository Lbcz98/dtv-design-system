import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders children", () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders as specified element", () => {
    render(<Text as="h2">Heading</Text>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
