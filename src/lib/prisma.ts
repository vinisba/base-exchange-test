import { PrismaClient } from "@generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.POSTGRES_PRISMA_URL;

if (!databaseUrl) {
  throw new Error("POSTGRES_PRISMA_URL is not set");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
export const prisma = new PrismaClient({ adapter });
