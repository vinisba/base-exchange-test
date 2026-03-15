import { MoveRight } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/server";
import { formatCurrency, formatDateTime } from "@/utils/format";
import { OrderSide } from "./columns";
import { OrderStatus } from "./order-status";

export async function OrderDetail({ id }: { id: string }) {
  const { data } = await api.orders({ id }).get({
    headers: await headers(),
  });

  if (!data) return redirect("/dashboard");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <h2 className="text-lg font-semibold">Detalhes da Ordem</h2>
          <p className="text-sm text-muted-foreground">
            Criado por {data.user.name} em {formatDateTime(data.createdAt)}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <div>
              ID: <span className="text-muted-foreground">{data.id}</span>
            </div>
            <div>
              Ação:{" "}
              <span className="text-muted-foreground">{data.instrument}</span>
            </div>
            <div>
              Lado:{" "}
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {OrderSide[data.side]}
              </Badge>
            </div>
            <div>
              Status: <OrderStatus status={data.status} />
            </div>
            <div>
              Quantidade (Restante):{" "}
              <span className="text-muted-foreground">
                {data.quantity} ({data.remaining})
              </span>
            </div>
            <div>
              Preço:{" "}
              <span className="text-muted-foreground">
                {formatCurrency(data.price / 100)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de status</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {data.histories.length ? (
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.histories.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell className="text-xs">
                      {formatDateTime(history.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row gap-2 items-center">
                        <OrderStatus status={history.oldStatus} />
                        <MoveRight className="text-muted-foreground" />
                        <OrderStatus status={history.newStatus} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="px-6">Nenhum registro</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de execuções</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {data.executions.length ? (
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Preço</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.executions.map((execution) => (
                  <TableRow key={execution.id} className="text-xs">
                    <TableCell>{formatDateTime(execution.createdAt)}</TableCell>
                    <TableCell>{execution.quantity}</TableCell>
                    <TableCell>
                      {formatCurrency(execution.price / 100)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="px-6">Nenhum registro</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
