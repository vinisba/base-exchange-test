import Elysia from "elysia";
import { dashboard } from "./dashboard";
import { orders } from "./orders";
import { auth } from "./utils/auth";
import { brapi } from "./utils/brapi";
import { docs } from "./utils/openapi";

export const app = new Elysia({ prefix: "/api" })
  .use(docs)
  .get(
    "/health",
    () => ({
      ok: new Date().toISOString(),
    }),
    { tags: ["Health Check"] },
  )
  .use(auth)
  .use(dashboard)
  .use(orders)
  .use(brapi);

export type App = typeof app;
