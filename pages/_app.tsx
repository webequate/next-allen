import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import UseScrollToTop from "../hooks/useScrollToTop";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AnimatePresence>
        <div className="mx-auto max-w-7xl sm:px-8 lg:px-16">
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <UseScrollToTop />
        </div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
