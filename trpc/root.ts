import { createTRPCRouter } from "./init";
import { resumeRouter } from "./routers/resume";
import { userRouter } from "./routers/user";

/**
 * Root tRPC Router
 * All sub-routers are merged here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  resume: resumeRouter,
});

export type AppRouter = typeof appRouter;
