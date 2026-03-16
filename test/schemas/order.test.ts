import { describe, expect, it } from "vitest";
import { orderSchema } from "@/schemas/order";

describe("orderSchema", () => {
  it("validates a correct order", () => {
    const result = orderSchema.safeParse({
      instrument: "PETR4",
      price: 2850,
      quantity: 10,
      side: "BUY",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty instrument", () => {
    const result = orderSchema.safeParse({
      instrument: "",
      price: 2850,
      quantity: 10,
      side: "BUY",
    });
    expect(result.success).toBe(false);
  });

  it("rejects price of 0", () => {
    const result = orderSchema.safeParse({
      instrument: "PETR4",
      price: 0,
      quantity: 10,
      side: "BUY",
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative quantity", () => {
    const result = orderSchema.safeParse({
      instrument: "PETR4",
      price: 2850,
      quantity: -1,
      side: "BUY",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer quantity", () => {
    const result = orderSchema.safeParse({
      instrument: "PETR4",
      price: 2850,
      quantity: 1.5,
      side: "BUY",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid side value", () => {
    const result = orderSchema.safeParse({
      instrument: "PETR4",
      price: 2850,
      quantity: 10,
      side: "HOLD",
    });
    expect(result.success).toBe(false);
  });

  it("accepts SELL side", () => {
    const result = orderSchema.safeParse({
      instrument: "VALE3",
      price: 100,
      quantity: 5,
      side: "SELL",
    });
    expect(result.success).toBe(true);
  });

  it("coerces string values to numbers", () => {
    const result = orderSchema.safeParse({
      instrument: "PETR4",
      price: "100",
      quantity: "10",
      side: "BUY",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.price).toBe(100);
      expect(result.data.quantity).toBe(10);
    }
  });
});
