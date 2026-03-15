"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useOrders } from "@/hooks/use-orders";
import { authClient } from "@/lib/client";
import { useOrderState } from "@/states/order";
import { columns } from "./columns";

interface OrderTableProps {
  onlyUser?: boolean;
}

export function OrderTable({ onlyUser = false }: OrderTableProps) {
  const { data: session } = authClient.useSession();
  const { orders, setOrderIdToCancel } = useOrders({
    userId: onlyUser ? session?.user.id : undefined,
  });
  const { sorting, setSorting } = useOrderState();

  const cols = useMemo(
    () =>
      columns({
        currentUserId: session?.user.id,
        onlyUser,
        setOrderIdToCancel,
      }),
    [session?.user.id, onlyUser, setOrderIdToCancel],
  );

  return (
    <DataTable
      columns={cols}
      data={orders}
      sorting={sorting}
      onSortingChange={setSorting}
    />
  );
}
