"use client";

import { useEffect, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useOrders } from "@/hooks/use-orders";
import { authClient } from "@/lib/client";

import { columns } from "./columns";

interface OrderTableProps {
  onlyUser?: boolean;
}

export function OrderTable({ onlyUser = false }: OrderTableProps) {
  const { data: session } = authClient.useSession();
  const { orders, setOrderIdToCancel, sorting, setSorting, resetFilters } =
    useOrders({
      userId: onlyUser ? session?.user.id : undefined,
    });

  useEffect(() => {
    resetFilters();
  }, [resetFilters]);

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
