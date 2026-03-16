"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/client";
import { useOrderState } from "@/states/order";
import { useDebounce } from "./use-debounce";

export function useOrders({ userId }: { userId?: string } = {}) {
  const {
    search,
    filters,
    sorting,
    setOrderIdToCancel,
    setSearch,
    setFilters,
    setSorting,
    resetFilters,
  } = useOrderState();

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", debouncedSearch, filters, sorting, userId],
    queryFn: () =>
      api.orders.get({
        query: {
          search: debouncedSearch,
          side: filters.side || undefined,
          status: filters.status || undefined,
          createdAt: filters.createdAt?.toISOString(),
          sortBy: sorting[0]?.id,
          sortOrder: sorting[0]?.desc ? "desc" : "asc",
          userId: userId,
        },
      }),
  });

  const orders = data?.data || [];

  return {
    orders,
    isLoading,
    setOrderIdToCancel,
    search,
    filters,
    sorting,
    setSearch,
    setFilters,
    setSorting,
    resetFilters,
  };
}
