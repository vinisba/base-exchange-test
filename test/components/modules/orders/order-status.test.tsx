import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OrderStatus } from "@/components/modules/orders/order-status";

describe("OrderStatus", () => {
  it("renders OPEN status text", () => {
    render(<OrderStatus status="OPEN" />);
    expect(screen.getByText("Aberta")).toBeInTheDocument();
  });

  it("renders CANCELED status text", () => {
    render(<OrderStatus status="CANCELED" />);
    expect(screen.getByText("Cancelada")).toBeInTheDocument();
  });

  it("renders PARTIAL status text", () => {
    render(<OrderStatus status="PARTIAL" />);
    expect(screen.getByText("Parcial")).toBeInTheDocument();
  });

  it("renders EXECUTED status text", () => {
    render(<OrderStatus status="EXECUTED" />);
    expect(screen.getByText("Executada")).toBeInTheDocument();
  });

  it("renders inside a badge element", () => {
    const { container } = render(<OrderStatus status="OPEN" />);
    const badge = container.querySelector("[data-slot='badge']");
    expect(badge).toBeInTheDocument();
  });
});
