// pages/photos.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { Album, Section, Photo } from "@/types/photo";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import albums from "@/data/photos-test.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

interface PhotosPageProps {
  name: string;
  socialLinks: SocialLink[];
  albums: Album[];
}

const PhotosPage: NextPage<PhotosPageProps> = ({
  name,
  socialLinks,
  albums,
}) => {
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 text-light-1 dark:text-light-1">
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
                <div className="absolute inset-0 bg-black opacity-0 md:group-hover:opacity-50 transition duration-200 rounded shadow-md"></div>
                <div className="absolute inset-0 items-center justify-center opacity-0 md:group-hover:opacity-100 transition duration-200 p-4">
                  <h2 className="text-xl mb-2">{album.title}</h2>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 md:group-hover:opacity-100 transition duration-200">
                  <span className="text-4xl">+</span>
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

export const getStaticProps: GetStaticProps<PhotosPageProps> = async () => {
  return {
    props: {
      name: basics.name,
      abouts: basics.abouts,
      socialLinks: basics.socialLinks,
      albums: JSON.parse(JSON.stringify(albums)),
    },
    revalidate: 60,
  };
};

export default PhotosPage;
