import "../styles/index.css";
import { AnimatePresence } from "framer-motion";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </AnimatePresence>
  );
}

export default MyApp;
