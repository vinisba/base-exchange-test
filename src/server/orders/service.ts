import type { User } from "better-auth";
import { prisma } from "@/lib/prisma";
import type { OrderModel } from "./model";

export abstract class OrderService {
  static async getOrders(): Promise<OrderModel["order"][]> {
    return (await prisma.order.findMany()).map((order) => ({
      ...order,
      price: Number(order.price),
    }));
  }

  static async create(
    order: OrderModel["create"],
    user: User,
  ): Promise<OrderModel["order"]> {
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
}
