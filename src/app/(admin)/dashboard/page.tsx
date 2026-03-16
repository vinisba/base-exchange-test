import { LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DashboardKpi } from "@/components/modules/dashboard/dashboard-kpi";
import { DashboardKpiSkeleton } from "@/components/modules/dashboard/dashboard-kpi-skeleton";
import OrderCancel from "@/components/modules/orders/order-cancel";
import { OrderTable } from "@/components/modules/orders/order-table";
import { OrderTableFilters } from "@/components/modules/orders/order-table-filters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Page, PageContent, PageTitle } from "@/components/ui/page";

export default async function DashboardPage() {
  return (
    <Page>
      <PageTitle>
        <LayoutDashboard />
        Dashboard
      </PageTitle>
      <PageContent>
        <Suspense fallback={<DashboardKpiSkeleton />}>
          <DashboardKpi />
        </Suspense>
        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-row items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold">Ordens</h2>
                <small>Lista de ordens do sistema</small>
              </div>
              <Button variant="default" asChild>
                <Link href="/orders/new">
                  <Plus />
                  Adicionar
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <OrderTableFilters />
            <OrderTable />
            <OrderCancel />
          </CardContent>
        </Card>
      </PageContent>
    </Page>
  );
}
