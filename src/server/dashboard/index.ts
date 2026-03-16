import Elysia from "elysia";
import { auth } from "../utils/auth";
import { DashboardService } from "./service";

export const dashboard = new Elysia({
  prefix: "/dashboard",
  tags: ["Dashboard"],
})
  .use(auth)
  .guard({
    auth: true,
  })
  .get("", async () => {
    return await DashboardService.GetKPIs();
  });
