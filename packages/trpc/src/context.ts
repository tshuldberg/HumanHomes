import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { db } from "@humanhomes/db";

export interface Context {
  db: typeof db;
  userId: string | null;
}

export async function createContext(opts: CreateFastifyContextOptions): Promise<Context> {
  const userId = opts.req.headers["x-clerk-user-id"] as string | undefined;

  return {
    db,
    userId: userId ?? null,
  };
}
