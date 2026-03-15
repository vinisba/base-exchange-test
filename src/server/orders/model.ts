import {
  Order,
  OrderPlain,
  OrderPlainInputCreate,
} from "@generated/prismabox/Order";
import { t, type UnwrapSchema } from "elysia";

export const OrderModel = {
  create: t.Omit(OrderPlainInputCreate, ["status", "remaining"]),
  orderPlain: OrderPlain,
  order: Order,
} as const;

export type OrderModel = {
  [k in keyof typeof OrderModel]: UnwrapSchema<(typeof OrderModel)[k]>;
};
