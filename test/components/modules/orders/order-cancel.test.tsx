import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

const mockCancelOrder = vi.fn();
const mockSetOrderIdToCancel = vi.fn();

vi.mock("@/hooks/use-cancel-order", () => ({
  useCancelOrder: () => ({
    orderIdToCancel: "order-123",
    setOrderIdToCancel: mockSetOrderIdToCancel,
    isCanceling: false,
    cancelOrder: mockCancelOrder,
  }),
}));

import OrderCancel from "@/components/modules/orders/order-cancel";

describe("OrderCancel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the confirmation dialog when orderIdToCancel is set", () => {
    render(<OrderCancel />);
    expect(
      screen.getByText("Você deseja cancelar esta ordem?"),
    ).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<OrderCancel />);
    expect(
      screen.getByText(/Esta ação não pode ser desfeita/),
    ).toBeInTheDocument();
  });

  it("calls setOrderIdToCancel(null) when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<OrderCancel />);

    await user.click(screen.getByText("Fechar"));
    expect(mockSetOrderIdToCancel).toHaveBeenCalledWith(null);
  });

  it("calls cancelOrder when confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<OrderCancel />);

    await user.click(screen.getByText("Continuar"));
    expect(mockCancelOrder).toHaveBeenCalledWith("order-123");
  });
});
