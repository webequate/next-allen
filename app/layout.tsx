import "@/styles/globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Bruno_Ace } from "next/font/google";
import { ThemeProvider } from "next-themes";

const brunoAce = Bruno_Ace({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Allen Hayden Johnson",
  description: "Allen Hayden Johnson's personal website.",
  icons: {
    icon: "/allen.png",
    apple: "/allen.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={brunoAce.className}>
      <head></head>
      <body className="flex flex-col items-center">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="w-full max-w-7xl sm:px-8 lg:px-16">
            <main className="min-h-screen bg-white dark:bg-neutral-900 sm:border-x border-dark-3 dark:border-light-3 px-3 sm:px-8 lg:px-16">
              <div className="bg-white dark:bg-neutral-900">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
