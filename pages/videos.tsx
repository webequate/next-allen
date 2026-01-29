// pages/videos.tsx
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { motion } from "framer-motion";
import { SocialLink } from "@/types/basics";
import { Video } from "@/types/video";
import basics from "@/data/basics.json";
import videos from "@/data/videos.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Seo from "@/components/Seo";

interface VideosProps {
  videos: Video[];
  name: string;
  socialLinks: SocialLink[];
}

const VideosPage: NextPage<VideosProps> = ({ videos, name, socialLinks }) => {
  return (
    <div className="mx-auto">
      <Seo
        title={`Videos | ${basics.name}`}
        description={`Video archive by ${basics.name}.`}
      />
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 text-dark-2 dark:text-light-2">
          {videos.map((video) => {
            return (
              <Link
                key={video.id}
                href={`/video/${video.id}`}
                className="group relative cursor-pointer"
              >
                <Image
                  src={`/video/thumb/${video.thumb}`}
                  alt={video.title}
                  width={320}
                  height={240}
                  className="rounded shadow-md md:transition md:duration-200 md:ease-in-out md:transform"
                />
                <div className="items-center justify-center">
                  <h2 className="text-xl mt-4 mb-2">{video.title}</h2>
                </div>
                <div className="items-center justify-center">
                  <span className="text-sm">{video.description}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  VideosProps,
  ParsedUrlQuery
> = async () => {
  return {
    props: {
      videos: JSON.parse(JSON.stringify(videos)),
      name: basics.name,
      socialLinks: basics.socialLinks,
    },
    revalidate: 60,
  };
};

export default VideosPage;
