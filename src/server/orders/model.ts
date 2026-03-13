import { OrderPlain, OrderPlainInputCreate } from "@generated/prismabox/Order";
import { t, type UnwrapSchema } from "elysia";

export const OrderModel = {
  create: t.Omit(OrderPlainInputCreate, ["status", "remaining"]),
  order: OrderPlain,
} as const;

export type OrderModel = {
  [k in keyof typeof OrderModel]: UnwrapSchema<(typeof OrderModel)[k]>;
};
