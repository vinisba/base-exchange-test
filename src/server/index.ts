import Elysia from "elysia";

export const app = new Elysia({ prefix: "/api" }).get("/health", () => "ok");

export type App = typeof app;
