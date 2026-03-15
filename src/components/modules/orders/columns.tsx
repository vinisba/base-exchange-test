import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import type { OrderModel } from "@/server/orders/model";
import { formatCurrency, formatDateTime } from "@/utils/format";
import { OrderStatus } from "./order-status";

enum OrderSide {
  BUY = "Compra",
  SELL = "Venda",
}

export const columns: ColumnDef<OrderModel["order"]>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "instrument",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ação" />
    ),
  },
  {
    accessorKey: "side",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lado" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {OrderSide[row.original.side]}
      </Badge>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qtd. (Restante)" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.quantity} ({row.original.remaining})
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => <div>{formatCurrency(row.original.price / 100)}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <OrderStatus status={row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row }) => <div>{formatDateTime(row.original.createdAt)}</div>,
  },
];
