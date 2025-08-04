// components/Layout.tsx
import React from "react";
import Head from "next/head";
import { useEffect } from "react";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  title = "Allen Hayden Johnson",
  children,
}) => {
  useEffect(() => {
    document.body.classList.add("flex");
    document.body.classList.add("flex-col");
    document.body.classList.add("bg-light-1");
    document.body.classList.add("dark:bg-black");
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Allen Hayden Johnson's personal website."
          key="desc"
        />
        <meta property="og:title" content="Allen Hayden Johnson" />
        <meta
          property="og:description"
          content="Allen Hayden Johnson's personal website."
        />
        <meta
          property="og:image"
          content="https://allenhaydenjohnson.com/images/allen-og.jpg"
        />
        <meta property="og:url" content="https://www.allenhaydenjohnson.com" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/allen.png" />
      </Head>
      <main className="min-h-screen bg-white dark:bg-neutral-900 sm:border-x border-dark-3 dark:border-light-3 px-6 sm:px-8 lg:px-16">
        <div className="bg-white dark:bg-neutral-900">{children}</div>
      </main>
    </>
  );
};

export default Layout;
