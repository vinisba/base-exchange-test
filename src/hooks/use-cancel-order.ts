"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/client";
import { useOrderState } from "@/states/order";

export function useCancelOrder() {
  const queryClient = useQueryClient();
  const { orderIdToCancel, setOrderIdToCancel } = useOrderState();

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

  return { cancelOrder, isCanceling, orderIdToCancel, setOrderIdToCancel };
}
