import { Metadata } from "next";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import BusinessCard from "@/components/BusinessCard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `About | ${basics.name}`,
  description: basics.abouts?.[0] || "Learn more about Allen Hayden Johnson.",
  openGraph: {
    images: ["https://allenhaydenjohnson.com/og-allen.png"],
  },
};

export default function AboutPage() {
  const { name, socialLinks } = basics as {
    name: string;
    socialLinks: SocialLink[];
  };

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <div className="page-content text-base text-dark-2 dark:text-light-2">
        <BusinessCard />
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
