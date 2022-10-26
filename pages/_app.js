import "../styles/index.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps, router }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default MyApp;
