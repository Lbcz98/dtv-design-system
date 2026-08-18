import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ContentTrail } from "./ContentTrail";
import { MainButton } from "../MainButton";

describe("ContentTrail", () => {
  it("renders the grouped main buttons", () => {
    render(
      <ContentTrail aria-label="Trilho">
        <MainButton title="Opções de áudio" />
        <MainButton title="Estatísticas" />
      </ContentTrail>,
    );

    expect(screen.getByRole("button", { name: "Opções de áudio" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Estatísticas" })).toBeInTheDocument();
  });

  it("marks the grouping side for left and right origins", () => {
    const { rerender } = render(
      <ContentTrail side="start" aria-label="Trilho">
        <MainButton title="Perfil" />
      </ContentTrail>,
    );
    expect(screen.getByLabelText("Trilho")).toHaveAttribute("data-side", "start");

    rerender(
      <ContentTrail side="end" aria-label="Trilho">
        <MainButton title="Perfil" />
      </ContentTrail>,
    );
    expect(screen.getByLabelText("Trilho")).toHaveAttribute("data-side", "end");
  });

  it("keeps buttons interactive", () => {
    const onClick = vi.fn();
    render(
      <ContentTrail>
        <MainButton title="Lances da partida" onClick={onClick} />
      </ContentTrail>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Lances da partida" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
