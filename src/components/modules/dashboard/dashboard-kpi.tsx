import {
  FileCheckCorner,
  FilePlusCorner,
  FileXCorner,
  Receipt,
} from "lucide-react";
import { headers } from "next/headers";
import { CardGrid, CardGridItem } from "@/components/ui/card-grid";
import { api } from "@/lib/server";
import { formatCurrency } from "@/utils/format";

export async function DashboardKpi() {
  const { data } = await api.dashboard.get({
    headers: await headers(),
  });

  // Fake delay to simulate loading
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <CardGrid>
      <CardGridItem
        icon={<FilePlusCorner />}
        title="Total Aberto ou Parcial"
        value={data?.totalOpenOrPartial.toString() || ""}
      />
      <CardGridItem
        icon={<FileXCorner />}
        title="Total Cancelada"
        value={data?.totalCanceled.toString() || ""}
      />
      <CardGridItem
        icon={<FileCheckCorner />}
        title="Total Executada"
        value={data?.totalExecuted.toString() || ""}
      />
      <CardGridItem
        icon={<Receipt />}
        title="Valor Total Executado"
        value={formatCurrency((data?.totalAmountExecuted || 0) / 100)}
      />
    </CardGrid>
  );
}
