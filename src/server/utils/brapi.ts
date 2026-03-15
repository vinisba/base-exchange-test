import Elysia, { t } from "elysia";
import { auth } from "./auth";

const BRAPI_API_URL = "https://brapi.dev/api/quote/list";

export type Stock = {
  stock: string;
  name: string;
  logo: string;
  sector: string;
};

export const brapi = new Elysia({
  prefix: "/stocks",
  tags: ["Stocks (brapi.dev)"],
})
  .use(auth)
  .get(
    "",
    async ({ query, status }) => {
      const { q } = query;
      const response = await fetch(
        `${BRAPI_API_URL}?search=${q}&limit=5&type=stock`,
        {
          headers: {
            Authorization: `Bearer ${process.env.ABRAPI_API_TOKEN}`,
          },
        },
      );

      const data = (await response.json()) as { stocks: Stock[] };

      if (!response.ok) {
        return status(400, data);
      }

      return data.stocks;
    },
    {
      auth: true,
      query: t.Object({
        q: t.String({
          minLength: 3,
        }),
      }),
      response: {
        200: t.Array(
          t.Object({
            stock: t.String(),
            name: t.String(),
            logo: t.String(),
            sector: t.String(),
          }),
        ),
        400: t.Any(),
      },
    },
  );
