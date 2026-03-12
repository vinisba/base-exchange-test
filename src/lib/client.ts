import { treaty } from "@elysiajs/eden";
import { createAuthClient } from "better-auth/react";
import type { App } from "@/server";

export const api = treaty<App>(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
).api;

export const authClient = createAuthClient({
  basePath: "/api/auth",
});
