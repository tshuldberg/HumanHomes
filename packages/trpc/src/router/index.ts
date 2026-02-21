import { t } from "../trpc.js";
import { userRouter } from "./user.js";
import { healthRouter } from "./health.js";

export const appRouter = t.router({
  user: userRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
