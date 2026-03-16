import {
  FileCheckCorner,
  FilePlusCorner,
  FileXCorner,
  Receipt,
} from "lucide-react";
import { CardGrid } from "@/components/ui/card-grid";
import { Skeleton } from "@/components/ui/skeleton";

function CardGridItemSkeleton({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium sm:text-sm">{title}</span>
      </div>
      <Skeleton className="h-8 w-24 sm:w-42" />
    </div>
  );
}

export function DashboardKpiSkeleton() {
  return (
    <CardGrid>
      <CardGridItemSkeleton
        icon={<FilePlusCorner />}
        title="Total Aberto ou Parcial"
      />
      <CardGridItemSkeleton icon={<FileXCorner />} title="Total Cancelada" />
      <CardGridItemSkeleton
        icon={<FileCheckCorner />}
        title="Total Executada"
      />
      <CardGridItemSkeleton icon={<Receipt />} title="Valor Total Executado" />
    </CardGrid>
  );
}
