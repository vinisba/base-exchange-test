import { LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";
import OrderCancel from "@/components/modules/orders/order-cancel";
import { OrderTable } from "@/components/modules/orders/order-table";
import { TableFilters } from "@/components/modules/orders/table-filters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CardGrid, CardGridItem } from "@/components/ui/card-grid";
import { Page, PageContent, PageTitle } from "@/components/ui/page";

export default async function DashboardPage() {
  return (
    <Page>
      <PageTitle>
        <LayoutDashboard />
        Dashboard
      </PageTitle>
      <PageContent>
        <CardGrid>
          <CardGridItem
            icon={<LayoutDashboard />}
            title="Monthly revenue"
            value="$189,540.75"
          />
          <CardGridItem
            icon={<LayoutDashboard />}
            title="Orders fulfilled"
            value="21,847"
          />
          <CardGridItem
            icon={<LayoutDashboard />}
            title="New customers"
            value="4,975"
          />
          <CardGridItem
            icon={<LayoutDashboard />}
            title="Refunds issued"
            value="$8,473.00"
          />
        </CardGrid>
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
            <TableFilters />
            <OrderTable />
            <OrderCancel />
          </CardContent>
        </Card>
      </PageContent>
    </Page>
  );
}
