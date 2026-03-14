import { FileUser, Plus } from "lucide-react";
import Link from "next/link";
import { OrderTable } from "@/components/orders/table";
import { TableFilters } from "@/components/orders/table-filters";
import { Button } from "@/components/ui/button";
import { Page, PageContent, PageTitle } from "@/components/ui/page";

export default function OrdersPage() {
  return (
    <Page>
      <div className="flex flex-row justify-between items-center p-4 border-b">
        <PageTitle className="p-0 border-0">
          <FileUser />
          Minhas ordens
        </PageTitle>
        <Button variant="default" asChild>
          <Link href="/orders/new">
            <Plus />
            Adicionar
          </Link>
        </Button>
      </div>

      <PageContent>
        <TableFilters />
        <OrderTable />
      </PageContent>
    </Page>
  );
}
