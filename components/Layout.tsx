// components/Layout.tsx
"use client";

import React from "react";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("flex");
    document.body.classList.add("flex-col");
    document.body.classList.add("bg-light-1");
    document.body.classList.add("dark:bg-black");
  });

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-neutral-900 sm:border-x border-dark-3 dark:border-light-3 px-3 sm:px-8 lg:px-16">
        <div className="bg-white dark:bg-neutral-900">{children}</div>
      </main>
    </>
  );
};

export default Layout;
