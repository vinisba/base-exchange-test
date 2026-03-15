import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import type { OrderModel } from "@/server/orders/model";
import { formatCurrency, formatDateTime, getInitials } from "@/utils/format";
import { OrderStatus } from "./order-status";

export enum OrderSide {
  BUY = "Compra",
  SELL = "Venda",
}

export const columns = ({
  onlyUser = false,
  currentUserId,
  setOrderIdToCancel,
}: {
  onlyUser?: boolean;
  currentUserId?: string;
  setOrderIdToCancel: (orderId: string) => void;
}): ColumnDef<Omit<OrderModel["order"], "histories" | "executions">>[] => [
  {
    id: "user",
    cell: ({ row }) => {
      const user = row.original.user;
      if (onlyUser) return null;
      return (
        <Avatar className="h-6 w-6 rounded-lg">
          <AvatarImage src={user.image as string | undefined} alt={user.name} />
          <AvatarFallback className="rounded-lg text-xs">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="px-2">ID</div>,
    cell: ({ row }) => (
      <Button variant="link" asChild className="underline px-0">
        <Link href={`/orders/${row.original.id}`}>{row.original.id}</Link>
      </Button>
    ),
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
  {
    id: "actions",
    cell: ({ row }) => {
      if (
        currentUserId !== row.original.userId ||
        ["CANCELED", "EXECUTED"].includes(row.original.status)
      )
        return null;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOrderIdToCancel(row.original.id)}
          >
            Cancelar
          </Button>
        </div>
      );
    },
  },
];
