import '../styles/globals.css'
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from '../backend/router';
import superjson from "superjson";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// function getBaseUrl() {
//   if (typeof window !== 'undefined') {
//     return '';
//   }
//   // reference for vercel.com
//   if (process.env.VERCEL_URL) {
//     return `https://${process.env.VERCEL_URL}`;
//   }

//   // reference for render.com
//   if (process.env.RENDER_INTERNAL_HOSTNAME) {
//     return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
//   }

//   // assume localhost
//   return `http://localhost:${process.env.PORT ?? 3000}`;
// }

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      transformer:superjson,
      url: `/api/trpc`,
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);