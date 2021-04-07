import "../styles/index.css";
import { AnimatePresence } from "framer-motion";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps, router }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </SWRConfig>
  );
}

export default MyApp;
