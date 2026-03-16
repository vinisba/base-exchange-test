"use client";

import { useRouter } from "next/navigation";
import { OrderForm } from "@/components/modules/orders/order-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewOrderModal() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <Dialog open onOpenChange={(open) => !open && handleBack()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar ordem</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar uma nova ordem.
          </DialogDescription>
        </DialogHeader>

        <OrderForm />
      </DialogContent>
    </Dialog>
  );
}
