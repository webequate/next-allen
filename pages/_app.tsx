import "@/styles/globals.css";
import Layout from "@/components/Layout";
import UseScrollToTop from "../hooks/useScrollToTop";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="mx-auto max-w-7xl sm:px-8 lg:px-16">
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <UseScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
