import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import {createRouter,createContext} from "./context"
import superjson from "superjson";
import { questionRouter } from "./questions";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("questions.", questionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
