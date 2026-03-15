"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useOrders } from "@/hooks/use-orders";
import { columns } from "./columns";

export function OrderTable() {
  const { orders } = useOrders();
  const cols = useMemo(() => columns, []);

  return <DataTable columns={cols} data={orders} />;
}
