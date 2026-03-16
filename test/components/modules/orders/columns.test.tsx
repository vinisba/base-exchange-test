import { describe, expect, it, vi } from "vitest";
import { columns, OrderSide } from "@/components/modules/orders/columns";

describe("OrderSide enum", () => {
  it("maps BUY to Compra", () => {
    expect(OrderSide.BUY).toBe("Compra");
  });

  it("maps SELL to Venda", () => {
    expect(OrderSide.SELL).toBe("Venda");
  });
});

describe("columns", () => {
  const mockSetOrderIdToCancel = vi.fn();

  it("returns an array of column definitions", () => {
    const cols = columns({ setOrderIdToCancel: mockSetOrderIdToCancel });
    expect(Array.isArray(cols)).toBe(true);
    expect(cols.length).toBeGreaterThan(0);
  });

  it("includes expected column accessorKeys", () => {
    const cols = columns({ setOrderIdToCancel: mockSetOrderIdToCancel });
    const accessorKeys = cols
      .map((col) => ("accessorKey" in col ? col.accessorKey : col.id))
      .filter(Boolean);

    expect(accessorKeys).toContain("id");
    expect(accessorKeys).toContain("instrument");
    expect(accessorKeys).toContain("side");
    expect(accessorKeys).toContain("quantity");
    expect(accessorKeys).toContain("price");
    expect(accessorKeys).toContain("status");
    expect(accessorKeys).toContain("createdAt");
    expect(accessorKeys).toContain("actions");
    expect(accessorKeys).toContain("user");
  });
});
