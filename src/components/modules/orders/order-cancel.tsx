"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useOrders } from "@/hooks/use-orders";

export default function OrderCancel() {
  const { orderIdToCancel, setOrderIdToCancel, isCanceling, cancelOrder } =
    useOrders();

  function handleCancel() {
    setOrderIdToCancel(null);
  }

  function handleConfirm() {
    cancelOrder(orderIdToCancel as string);
  }

  return (
    <AlertDialog
      open={!!orderIdToCancel}
      onOpenChange={(open) => !!open && handleCancel()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você deseja cancelar esta ordem?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Esta ordem será cancelada
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Fechar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isCanceling}>
            {isCanceling ? "Cancelando..." : "Continuar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
