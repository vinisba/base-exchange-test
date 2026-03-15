import Elysia, { t } from "elysia";
import { auth } from "../utils/auth";
import { OrderModel } from "./model";
import { OrderService } from "./service";

export const orders = new Elysia({ prefix: "/orders" })
  .use(auth)
  .guard({
    auth: true,
    detail: {
      tags: ["Orders"],
    },
  })
  .get(
    "/",
    async ({ query }) => {
      const filters = {
        search: query.search,
        side: query.side,
        status: query.status,
        userId: query.userId,
        createdAt: query.createdAt ? new Date(query.createdAt) : undefined,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder as "asc" | "desc",
      };
      return OrderService.getOrders(filters);
    },
    {
      query: t.Optional(
        t.Object({
          search: t.Optional(t.String()),
          side: t.Optional(t.Enum({ BUY: "BUY", SELL: "SELL" })),
          status: t.Optional(
            t.Enum({
              OPEN: "OPEN",
              CANCELED: "CANCELED",
              PARTIAL: "PARTIAL",
              EXECUTED: "EXECUTED",
            }),
          ),
          createdAt: t.Optional(t.String()),
          sortBy: t.Optional(t.String()),
          userId: t.Optional(t.String()),
          sortOrder: t.Optional(t.Enum({ asc: "asc", desc: "desc" })),
        }),
      ),
    },
  )
  .post(
    "/",
    async ({ body, user }) => {
      const order = await OrderService.create(body, user);
      await OrderService.executeOrder(order);
      return order;
    },
    {
      body: OrderModel.create,
      response: {
        200: OrderModel.orderPlain,
      },
    },
  )
  .get(
    "/:id",
    async ({ params, status }) => {
      try {
        const order = await OrderService.getOrderById(params.id);
        return order;
      } catch {
        return status(404, "Not found");
      }
    },
    {
      response: {
        200: OrderModel.order,
        404: t.String(),
      },
    },
  )
  .post("/:id/cancel", async ({ params, status, user }) => {
    try {
      await OrderService.cancelOrder(params.id, user.id);
      return new Response(null, { status: 204 });
    } catch {
      return status(404, "Not found");
    }
  });
