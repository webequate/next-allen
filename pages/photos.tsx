// pages/photos.tsx
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { motion } from "framer-motion";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import albums from "@/data/photos.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

interface Album {
  id: string;
  title: string;
  description: string;
  cover: string;
}

interface PhotosProps {
  albums: Album[];
  name: string;
  socialLinks: SocialLink[];
}

const PhotosPage: NextPage<PhotosProps> = ({ albums, name, socialLinks }) => {
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 text-dark-2 dark:text-light-2">
          {albums.map((album, index) => {
            return (
              <Link
                key={index}
                href={`/album/${album.id}`}
                className="group relative cursor-pointer"
              >
                <Image
                  src={`/img/album/${album.cover}`}
                  alt={album.title}
                  width={320}
                  height={240}
                  className="rounded shadow-md md:transition md:duration-200 md:ease-in-out md:transform"
                />
                <div className="items-center justify-center">
                  <h2 className="text-xl mt-4 mb-2">{album.title}</h2>
                </div>
                <div className="items-center justify-center">
                  <span className="text-sm">{album.description}</span>
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
  PhotosProps,
  ParsedUrlQuery
> = async () => {
  return {
    props: {
      albums: JSON.parse(JSON.stringify(albums)),
      name: basics.name,
      socialLinks: basics.socialLinks,
    },
    revalidate: 60,
  };
};

export default PhotosPage;
