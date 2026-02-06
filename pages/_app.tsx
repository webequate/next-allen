import "@/styles/globals.css";
import Layout from "@/components/Layout";
import UseScrollToTop from "../hooks/useScrollToTop";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // Add class to trigger fade-in animation
      const content = document.querySelector(".page-content");
      if (content) {
        content.classList.remove("page-content-enter");
        // Force reflow to restart animation
        void (content as HTMLElement).offsetWidth;
        content.classList.add("page-content-enter");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
