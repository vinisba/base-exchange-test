import Elysia from "elysia";
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
  .get("/", async () => {
    return OrderService.getOrders();
  })
  .post(
    "/",
    async ({ body, user }) => {
      const order = await OrderService.create(body, user);
      return order;
    },
    {
      body: OrderModel.create,
      response: {
        200: OrderModel.order,
      },
    },
  );
