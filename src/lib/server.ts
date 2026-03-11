import "server-only";

import { treaty } from "@elysiajs/eden";
import { app } from "@/server";

export const api = treaty(app).api;
