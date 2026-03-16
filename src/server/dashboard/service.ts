import { prisma } from "@/lib/prisma";

export abstract class DashboardService {
  static async GetKPIs() {
    const [totalOpenOrPartial, totalCanceled, totalExecuted, amountResult] =
      await Promise.all([
        prisma.order.count({
          where: { status: { in: ["OPEN", "PARTIAL"] } },
        }),
        prisma.order.count({
          where: { status: "CANCELED" },
        }),
        prisma.order.count({
          where: { status: "EXECUTED" },
        }),
        prisma.$queryRaw<[{ total: bigint | null }]>`
          SELECT COALESCE(SUM(quantity * price), 0) AS total FROM execution
        `,
      ]);

    return {
      totalOpenOrPartial,
      totalCanceled,
      totalExecuted,
      totalAmountExecuted: Number(amountResult[0].total),
    };
  }
}
