"use client";

import { useMemo } from "react";
import { useOrders } from "@/hooks/use-orders";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

export function OrderTable() {
  const { orders } = useOrders();
  const cols = useMemo(() => columns, []);

  return <DataTable columns={cols} data={orders} />;
}
