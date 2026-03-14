import Elysia from "elysia";
import { orders } from "./orders";
import { auth } from "./utils/auth";
import { docs } from "./utils/openapi";

export const app = new Elysia({ prefix: "/api" })
  .use(docs)
  .get("/health", () => "ok", { tags: ["Health Check"] })
  .use(auth)
  .use(orders);

export type App = typeof app;
