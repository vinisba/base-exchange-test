"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/client";
import type { OrderData } from "@/schemas/order";

export function useCreateOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: createOrder, isPending } = useMutation({
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

  return { createOrder, isPending };
}
