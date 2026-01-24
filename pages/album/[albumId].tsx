console.log("pages/album/[albumId].tsx");
import { GetStaticPaths, GetStaticProps } from "next";
import { motion } from "framer-motion";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { SocialLink } from "@/types/basics";
import { Album } from "@/types/photo";
import albums from "@/data/photos.json";
import basics from "@/data/basics.json";

import Header from "@/components/Header";
import Heading from "@/components/Heading";
import PhotoGrid from "@/components/PhotoGrid";
import Footer from "@/components/Footer";

interface AlbumParams extends ParsedUrlQuery {
  albumId: string;
}

interface AlbumProps {
  album: Album;
  prevAlbum: Album | null;
  nextAlbum: Album | null;
  name: string;
  socialLinks: SocialLink[];
}

const AlbumPage = ({
  album,
  prevAlbum,
  nextAlbum,
  name,
  socialLinks,
}: AlbumProps) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", checkMobile);
    checkMobile();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      nextAlbum && isMobile && router.push(`/album/${nextAlbum.id}`),
    onSwipedRight: () =>
      prevAlbum && isMobile && router.push(`/album/${prevAlbum.id}`),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  const AlbumNavigation = () => (
    <div className="flex justify-between items-center mb-6 text-base">
      <div className="flex-1">
        {prevAlbum && (
          <Link 
            href={`/album/${prevAlbum.id}`}
            className="text-dark-1 dark:text-light-1 hover:text-dark-3 dark:hover:text-light-2 transition-colors"
          >
            ← Previous album: {prevAlbum.title}
          </Link>
        )}
      </div>
      <div className="flex-1 text-right">
        {nextAlbum && (
          <Link 
            href={`/album/${nextAlbum.id}`}
            className="text-dark-1 dark:text-light-1 hover:text-dark-3 dark:hover:text-light-2 transition-colors"
          >
            Next album: {nextAlbum.title} →
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
      <Head>
        <meta property="og:image" content={album.cover} />
      </Head>
      <Header socialLink={socialLinks[0]} />

      <AlbumNavigation />

      <motion.div
        {...handlers}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="text-light-1 dark:text-light-1">
          {album.sections.map((section, index) => (
            <div
              key={index}
              className="border border-dark-3 dark:border-light-3 p-4 mb-10"
            >
              <Heading text={section.heading} />
              <PhotoGrid photos={section.photos} path={album.id} />
            </div>
          ))}
        </div>
      </motion.div>

      <AlbumNavigation />

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<AlbumParams> = async () => {
  const paths = albums.map((album) => ({
    params: { albumId: album.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<AlbumProps, AlbumParams> = async ({
  params,
}) => {
  if (!params) return { notFound: true };

  const albumIndex = albums.findIndex((a) => a.id === params.albumId);
  if (albumIndex === -1) return { notFound: true };

  const album = albums[albumIndex];
  const prevAlbum = albumIndex > 0 ? albums[albumIndex - 1] : null;
  const nextAlbum =
    albumIndex < albums.length - 1 ? albums[albumIndex + 1] : null;

  return {
    props: {
      album: JSON.parse(JSON.stringify(album)),
      prevAlbum: prevAlbum ? JSON.parse(JSON.stringify(prevAlbum)) : null,
      nextAlbum: nextAlbum ? JSON.parse(JSON.stringify(nextAlbum)) : null,
      name: basics.name,
      socialLinks: basics.socialLinks,
    },
    revalidate: 60,
  };
};

export default AlbumPage;
