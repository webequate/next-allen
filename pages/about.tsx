// pages/about.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import BusinessCard from "@/components/BusinessCard";
import Instructions from "@/components/Instructions";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

interface AboutPageProps {
  name: string;
  socialLinks: SocialLink[];
}

const AboutPage: NextPage<AboutPageProps> = ({ name, socialLinks }) => {
  return (
    <div className="mx-auto">
      <Seo
        title={`About | ${basics.name}`}
        description={
          basics.abouts?.[0] || "Learn more about Allen Hayden Johnson."
        }
        image="/og-allen.png"
      />
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <BusinessCard />
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
    },
    revalidate: 60,
  };
};

export default AboutPage;
