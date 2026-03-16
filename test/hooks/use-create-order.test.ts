import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCreateOrder } from "@/hooks/use-create-order";

const { mockBack, mockPost, mockInvalidateQueries, mockToastSuccess, mockToastError } = vi.hoisted(() => ({
  mockBack: vi.fn(),
  mockPost: vi.fn(),
  mockInvalidateQueries: vi.fn(),
  mockToastSuccess: vi.fn(),
  mockToastError: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack }),
}));

vi.mock("sonner", () => ({
  toast: { success: mockToastSuccess, error: mockToastError },
}));

vi.mock("@/lib/client", () => ({
  api: { orders: { post: mockPost } },
}));

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: () => ({ invalidateQueries: mockInvalidateQueries }),
  };
});

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("useCreateOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls api.orders.post on createOrder", async () => {
    mockPost.mockResolvedValueOnce({ data: { id: "1" } });

    const { result } = renderHook(() => useCreateOrder(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.createOrder({
        instrument: "PETR4",
        price: 100,
        quantity: 10,
        side: "BUY",
      });
    });

    expect(mockPost).toHaveBeenCalledWith({
      instrument: "PETR4",
      price: 100,
      quantity: 10,
      side: "BUY",
    });
  });

  it("shows success toast and navigates back on success", async () => {
    mockPost.mockResolvedValueOnce({ data: { id: "1" } });

    const { result } = renderHook(() => useCreateOrder(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.createOrder({
        instrument: "PETR4",
        price: 100,
        quantity: 10,
        side: "BUY",
      });
    });

    expect(mockToastSuccess).toHaveBeenCalledWith("Ordem criada com sucesso!");
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ["orders"],
    });
    expect(mockBack).toHaveBeenCalled();
  });

  it("shows error toast on failure", async () => {
    mockPost.mockRejectedValueOnce(new Error("fail"));

    const { result } = renderHook(() => useCreateOrder(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.createOrder({
        instrument: "PETR4",
        price: 100,
        quantity: 10,
        side: "BUY",
      });
    });

    expect(mockToastError).toHaveBeenCalledWith("Erro ao criar ordem!");
  });
});
