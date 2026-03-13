"use client";

import { useMemo } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { orders } from "./data";

export function OrderTable() {
  const cols = useMemo(() => columns, []);

  return <DataTable columns={cols} data={orders} />;
}
