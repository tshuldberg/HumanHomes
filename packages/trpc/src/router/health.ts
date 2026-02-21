import { t, publicProcedure } from "../trpc.js";

export const healthRouter = t.router({
  check: publicProcedure.query(() => {
    return {
      status: "ok" as const,
      timestamp: new Date().toISOString(),
      version: "0.1.0",
    };
  }),
});
