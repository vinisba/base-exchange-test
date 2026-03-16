import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OrderDetailSkeleton } from "@/components/modules/orders/order-detail-skeleton";

describe("OrderDetailSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<OrderDetailSkeleton />);
    expect(container).toBeTruthy();
  });

  it("renders order detail header", () => {
    render(<OrderDetailSkeleton />);
    expect(screen.getByText("Detalhes da Ordem")).toBeInTheDocument();
  });

  it("renders field labels", () => {
    render(<OrderDetailSkeleton />);
    expect(screen.getByText("ID:")).toBeInTheDocument();
    expect(screen.getByText("Ação:")).toBeInTheDocument();
    expect(screen.getByText("Lado:")).toBeInTheDocument();
    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Quantidade (Restante):")).toBeInTheDocument();
    expect(screen.getByText("Preço:")).toBeInTheDocument();
  });

  it("renders history section titles", () => {
    render(<OrderDetailSkeleton />);
    expect(screen.getByText("Histórico de status")).toBeInTheDocument();
    expect(screen.getByText("Histórico de execuções")).toBeInTheDocument();
  });
});
