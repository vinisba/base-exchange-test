import type { Side, Status } from "@generated/prisma/enums";
import type {
  OrderOrderByWithRelationInput,
  OrderWhereInput,
} from "@generated/prisma/models";
import type { User } from "better-auth";
import { prisma } from "@/lib/prisma";
import type { OrderModel } from "./model";

export abstract class OrderService {
  static async getOrders(filters?: {
    search?: string;
    createdAt?: Date;
    side?: Side;
    status?: Status;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    userId?: string;
  }): Promise<Omit<OrderModel["order"], "histories" | "executions">[]> {
    const where: OrderWhereInput = {};

    if (filters?.userId) {
      where.userId = filters.userId;
    }

    if (filters?.search) {
      where.OR = [
        { id: { contains: filters.search, mode: "insensitive" } },
        { instrument: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters?.side) {
      where.side = filters.side;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.createdAt) {
      const startOfDay = new Date(filters.createdAt);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(filters.createdAt);
      endOfDay.setHours(23, 59, 59, 999);

      where.createdAt = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    const orderBy: OrderOrderByWithRelationInput = {};
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof OrderOrderByWithRelationInput;
      (orderBy as Record<string, string>)[key] = filters.sortOrder || "desc";
    } else {
      orderBy.createdAt = "desc";
    }

    return (
      await prisma.order.findMany({
        where,
        include: {
          user: true,
        },
        orderBy,
      })
    ).map((order) => ({
      ...order,
      price: Number(order.price),
    }));
  }

  static async create(
    order: OrderModel["create"],
    user: User,
  ): Promise<OrderModel["orderPlain"]> {
    const newOrder = await prisma.order.create({
      data: {
        ...order,
        remaining: order.quantity,
        userId: user.id,
      },
    });

    return {
      ...newOrder,
      price: Number(newOrder.price),
    };
  }

  static async getOrderById(id: string): Promise<OrderModel["order"]> {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id },
      include: {
        user: true,
        histories: true,
        executions: true,
      },
    });

    return {
      ...order,
      price: Number(order.price),
      executions: order.executions.map((execution) => ({
        ...execution,
        price: Number(execution.price),
      })),
    };
  }

  static async cancelOrder(id: string, userId: string): Promise<void> {
    console.log(id, userId);
    const order = await prisma.order.findUniqueOrThrow({
      where: { id, status: { in: ["OPEN", "PARTIAL"] }, userId },
    });

    console.log(order);

    await prisma.order.update({
      where: { id },
      data: { status: "CANCELED" },
    });
  }

  static async executeOrder(order: OrderModel["orderPlain"]): Promise<void> {
    const inverseSide = order.side === "BUY" ? "SELL" : "BUY";

    const matchingOrders = await prisma.order.findMany({
      where: {
        instrument: order.instrument,
        userId: { not: order.userId },
        side: inverseSide,
        status: { in: ["OPEN", "PARTIAL"] },
        remaining: { gt: 0 },
        price:
          order.side === "BUY" ? { lte: order.price } : { gte: order.price },
      },
      orderBy: [
        { price: order.side === "BUY" ? "asc" : "desc" },
        { createdAt: "asc" },
      ],
    });

    let orderRemaining = order.remaining;
    let orderStatus = order.status;

    for (const matchingOrder of matchingOrders) {
      if (orderRemaining <= 0) break;

      const fillQty = Math.min(orderRemaining, matchingOrder.remaining);
      const executionPrice = matchingOrder.price;

      orderRemaining -= fillQty;
      const matchingRemaining = matchingOrder.remaining - fillQty;

      const newMatchingStatus =
        matchingRemaining === 0 ? "EXECUTED" : "PARTIAL";
      const newOrderStatus = orderRemaining === 0 ? "EXECUTED" : "PARTIAL";

      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { id: matchingOrder.id },
          data: {
            remaining: matchingRemaining,
            status: newMatchingStatus,
          },
        });

        await tx.order.update({
          where: { id: order.id },
          data: {
            remaining: orderRemaining,
            status: newOrderStatus,
          },
        });

        await tx.execution.create({
          data: {
            orderId: matchingOrder.id,
            quantity: fillQty,
            price: executionPrice,
          },
        });

        await tx.execution.create({
          data: {
            orderId: order.id,
            quantity: fillQty,
            price: executionPrice,
          },
        });

        if (matchingOrder.status !== newMatchingStatus) {
          await tx.history.create({
            data: {
              orderId: matchingOrder.id,
              oldStatus: matchingOrder.status,
              newStatus: newMatchingStatus,
            },
          });
        }

        if (orderStatus !== newOrderStatus) {
          await tx.history.create({
            data: {
              orderId: order.id,
              oldStatus: orderStatus,
              newStatus: newOrderStatus,
            },
          });
        }
      });

      orderStatus = newOrderStatus;
    }
  }
}
