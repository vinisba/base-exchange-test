import { FileText } from "lucide-react";
import { Suspense } from "react";
import { OrderDetail } from "@/components/modules/orders/order-detail";
import { OrderDetailSkeleton } from "@/components/modules/orders/order-detail-skeleton";
import { Page, PageContent, PageTitle } from "@/components/ui/page";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Page>
      <PageTitle>
        <FileText />
        Ordem: {slug}
      </PageTitle>
      <PageContent>
        <Suspense fallback={<OrderDetailSkeleton />}>
          <OrderDetail id={slug} />
        </Suspense>
      </PageContent>
    </Page>
  );
}
