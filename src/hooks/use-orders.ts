"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/client";
import type { OrderData } from "@/schemas/order";

export function useOrders() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.orders.get(),
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
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

  const orders = data?.data || [];

  return {
    orders,
    createOrder: mutate,
    isLoading,
  };
}
