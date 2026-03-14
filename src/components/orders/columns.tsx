import type { ColumnDef } from "@tanstack/react-table";
import type { OrderModel } from "@/server/orders/model";
import { DataTableColumnHeader } from "../ui/data-table-column-header";

export const columns: ColumnDef<OrderModel["order"]>[] = [
  {
    accessorKey: "id",
    enableSorting: true,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "instrument",
    header: "Instrument",
  },
  {
    accessorKey: "side",
    header: "Side",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "remaining",
    header: "Remaining",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
