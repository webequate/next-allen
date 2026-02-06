// pages/index.tsx
import { GetStaticProps, NextPage } from "next";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import BusinessCard from "@/components/BusinessCard";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

interface HomePageProps {
  name: string;
  socialLinks: SocialLink[];
}

const HomePage: NextPage<HomePageProps> = ({ name, socialLinks }) => {
  return (
    <div className="mx-auto">
      <Seo
        title={basics.name}
        description={
          basics.abouts?.[0] || "Allen Hayden Johnson's personal website."
        }
        image="https://allenhaydenjohnson.com/og-allen.png"
      />
      <Header socialLink={socialLinks[0]} />

      <div className="page-content text-base text-dark-2 dark:text-light-2">
        <BusinessCard />
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  return {
    props: {
      name: basics.name,
      abouts: basics.abouts,
      socialLinks: basics.socialLinks,
    },
    revalidate: 60,
  };
};

export default HomePage;
