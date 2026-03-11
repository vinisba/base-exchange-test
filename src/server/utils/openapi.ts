/** biome-ignore-all lint/suspicious/noExplicitAny: Intentional "anys" for generate docs and paths to better-auth openapi integrate with elysia */
import openapi from "@elysiajs/openapi";
import Elysia from "elysia";
import { auth } from "@/lib/auth";

// Integrate better-auth OpenAPI with Elysia's OpenAPI plugin
let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
// biome-ignore lint/suspicious/noAssignInExpressions: This is intentional to cache the schema after the first generation.
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const OpenAPI = {
  getPaths: (prefix = "/api/auth") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];

          operation.tags = ["Authentication (better-auth)"];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

export const docs = new Elysia().use(
  openapi({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths(),
    },
  }),
);
