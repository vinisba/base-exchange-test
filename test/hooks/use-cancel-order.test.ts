import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCancelOrder } from "@/hooks/use-cancel-order";

const {
  mockCancelPost,
  mockInvalidateQueries,
  mockToastSuccess,
  mockToastError,
  mockSetOrderIdToCancel,
} = vi.hoisted(() => ({
  mockCancelPost: vi.fn(),
  mockInvalidateQueries: vi.fn(),
  mockToastSuccess: vi.fn(),
  mockToastError: vi.fn(),
  mockSetOrderIdToCancel: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: { success: mockToastSuccess, error: mockToastError },
}));

vi.mock("@/lib/client", () => ({
  api: {
    orders: (params: { id: string }) => ({
      cancel: { post: () => mockCancelPost(params.id) },
    }),
  },
}));

vi.mock("@/states/order", () => ({
  useOrderState: () => ({
    orderIdToCancel: "order-123",
    setOrderIdToCancel: mockSetOrderIdToCancel,
  }),
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

describe("useCancelOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns orderIdToCancel from state", () => {
    const { result } = renderHook(() => useCancelOrder(), {
      wrapper: createWrapper(),
    });
    expect(result.current.orderIdToCancel).toBe("order-123");
  });

  it("calls cancel API on cancelOrder", async () => {
    mockCancelPost.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useCancelOrder(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.cancelOrder("order-123");
    });

    expect(mockCancelPost).toHaveBeenCalledWith("order-123");
  });

  it("shows success toast and clears state on success", async () => {
    mockCancelPost.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useCancelOrder(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.cancelOrder("order-123");
    });

    expect(mockToastSuccess).toHaveBeenCalledWith(
      "Ordem cancelada com sucesso!",
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ["orders"],
    });
    expect(mockSetOrderIdToCancel).toHaveBeenCalledWith(null);
  });

  it("shows error toast on failure", async () => {
    mockCancelPost.mockRejectedValueOnce(new Error("fail"));

    const { result } = renderHook(() => useCancelOrder(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.cancelOrder("order-123");
    });

    expect(mockToastError).toHaveBeenCalledWith("Erro ao cancelar ordem!");
  });
});
