"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/client";
import type { OrderData } from "@/schemas/order";
import { useOrderState } from "@/states/order";
import { useDebounce } from "./use-debounce";

export function useOrders({ userId }: { userId?: string } = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { orderIdToCancel, setOrderIdToCancel, search, filters, sorting } =
    useOrderState();

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", debouncedSearch, filters, sorting, userId],
    queryFn: () =>
      api.orders.get({
        query: {
          search: debouncedSearch,
          side: filters.side,
          status: filters.status,
          createdAt: filters.createdAt?.toISOString(),
          sortBy: sorting[0]?.id,
          sortOrder: sorting[0]?.desc ? "desc" : "asc",
          userId: userId,
        },
      }),
  });

  const { mutate: createOrder } = useMutation({
    mutationFn: (order: OrderData) => api.orders.post(order),
    onSuccess: () => {
      toast.success("Ordem criada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      router.back();
    },
    onError: () => {
      toast.error("Erro ao criar ordem!");
    },
  });

  const { mutate: cancelOrder, isPending: isCanceling } = useMutation({
    mutationFn: (orderId: string) => api.orders({ id: orderId }).cancel.post(),
    onSuccess: () => {
      toast.success("Ordem cancelada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      setOrderIdToCancel(null);
    },
    onError: () => {
      toast.error("Erro ao cancelar ordem!");
    },
  });

  const orders = data?.data || [];

  return {
    orders,
    createOrder,
    cancelOrder,
    isLoading,
    isCanceling,
    orderIdToCancel,
    setOrderIdToCancel,
  };
}
