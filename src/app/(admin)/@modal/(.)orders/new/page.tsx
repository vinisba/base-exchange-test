"use client";

import { OrderForm } from "@/components/orders/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function NewOrderModal() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <Dialog open onOpenChange={(open) => !open && handleBack()}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Adicionar ordem</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar uma nova ordem.
          </DialogDescription>
        </DialogHeader>

        <OrderForm onFormClose={handleBack} />
      </DialogContent>
    </Dialog>
  );
}
