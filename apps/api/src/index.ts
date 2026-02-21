import Fastify from "fastify";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin, type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { appRouter, createContext } from "@humanhomes/trpc";
import { env } from "./env.js";
import { getAuth } from "./clerk.js";

const app = Fastify({
  logger: true,
  maxParamLength: 5000,
});

await app.register(cors, {
  origin: env.CORS_ORIGIN,
  credentials: true,
});

// Health check outside tRPC — responds even without database
app.get("/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

// tRPC routes at /trpc/*
await app.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext: async (opts: CreateFastifyContextOptions) => {
      const auth = await getAuth(opts.req);
      return createContext({
        ...opts,
        req: Object.assign(opts.req, {
          headers: {
            ...opts.req.headers,
            "x-clerk-user-id": auth.userId ?? undefined,
          },
        }),
      });
    },
  },
});

// Root info endpoint
app.get("/", async () => {
  return { name: "HumanHomes API", version: "0.1.0", status: "ok" };
});

// Graceful shutdown
const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
for (const signal of signals) {
  process.on(signal, async () => {
    app.log.info(`Received ${signal}, shutting down gracefully...`);
    await app.close();
    process.exit(0);
  });
}

try {
  await app.listen({ port: env.PORT, host: "0.0.0.0" });
  app.log.info(`HumanHomes API running on port ${env.PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

export { app };
