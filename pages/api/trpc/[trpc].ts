import { appRouter } from "../../../backend/router";
import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from "../../../backend/router/context";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});