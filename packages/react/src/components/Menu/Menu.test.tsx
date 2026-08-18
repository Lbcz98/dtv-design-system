import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";
import { HomeLogo } from "./HomeLogo";
import { Icon } from "../Icon";

describe("Menu", () => {
  it("renders start and end rails", () => {
    render(
      <Menu
        start={<MenuItem icon={<Icon name="clock" />} aria-label="Programação" />}
        end={<HomeLogo src="bug.png" aria-label="Início" />}
      />,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Programação" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Início" })).toBeInTheDocument();
  });

  it("renders two-line copy beside a configured slot", () => {
    render(
      <Menu
        start={
          <MenuItem
            icon={<Icon name="clock" />}
            title="Previsão do tempo"
            subtitle="São Paulo, SP"
            aria-label="Previsão do tempo"
          />
        }
      />,
    );

    expect(screen.getByText("Previsão do tempo")).toBeInTheDocument();
    expect(screen.getByText("São Paulo, SP")).toBeInTheDocument();
  });

  it("places copy before the button when align is end", () => {
    render(
      <MenuItem
        align="end"
        icon={<Icon name="clock" />}
        title="Copa do Mundo"
        subtitle="A seguir"
        aria-label="Programa"
      />,
    );

    const button = screen.getByRole("button", { name: "Programa" });
    const title = screen.getByText("Copa do Mundo");
    expect(title.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("calls onClick on a menu item", () => {
    const onClick = vi.fn();
    render(
      <MenuItem
        icon={<Icon name="clock" />}
        aria-label="Programação"
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Programação" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick on the home logo", () => {
    const onClick = vi.fn();
    render(<HomeLogo src="bug.png" aria-label="Início" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Início" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
