import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useOrders } from "@/hooks/use-orders";

const {
  mockGet,
  mockSetOrderIdToCancel,
  mockSetSearch,
  mockSetFilters,
  mockSetSorting,
  mockResetFilters,
} = vi.hoisted(() => ({
  mockGet: vi.fn(),
  mockSetOrderIdToCancel: vi.fn(),
  mockSetSearch: vi.fn(),
  mockSetFilters: vi.fn(),
  mockSetSorting: vi.fn(),
  mockResetFilters: vi.fn(),
}));

vi.mock("@/lib/client", () => ({
  api: { orders: { get: mockGet } },
}));

vi.mock("@/states/order", () => ({
  useOrderState: () => ({
    search: "PETR4",
    filters: { side: "BUY", status: undefined, createdAt: undefined },
    sorting: [{ id: "createdAt", desc: true }],
    setOrderIdToCancel: mockSetOrderIdToCancel,
    setSearch: mockSetSearch,
    setFilters: mockSetFilters,
    setSorting: mockSetSorting,
    resetFilters: mockResetFilters,
  }),
}));

vi.mock("@/hooks/use-debounce", () => ({
  useDebounce: (value: unknown) => value,
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("useOrders", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty orders when data is undefined", () => {
    mockGet.mockResolvedValue({ data: undefined });

    const { result } = renderHook(() => useOrders(), {
      wrapper: createWrapper(),
    });

    expect(result.current.orders).toEqual([]);
  });

  it("returns orders from API response", async () => {
    const orders = [{ id: "1", instrument: "PETR4" }];
    mockGet.mockResolvedValue({ data: orders });

    const { result } = renderHook(() => useOrders(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.orders).toEqual(orders);
    });
  });

  it("exposes state setters from useOrderState", () => {
    mockGet.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useOrders(), {
      wrapper: createWrapper(),
    });

    expect(result.current.setOrderIdToCancel).toBe(mockSetOrderIdToCancel);
    expect(result.current.setSearch).toBe(mockSetSearch);
    expect(result.current.setFilters).toBe(mockSetFilters);
    expect(result.current.setSorting).toBe(mockSetSorting);
    expect(result.current.resetFilters).toBe(mockResetFilters);
  });

  it("passes userId to query when provided", async () => {
    mockGet.mockResolvedValue({ data: [] });

    renderHook(() => useOrders({ userId: "user-1" }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled();
    });

    const callArgs = mockGet.mock.calls[0][0];
    expect(callArgs.query.userId).toBe("user-1");
  });
});
