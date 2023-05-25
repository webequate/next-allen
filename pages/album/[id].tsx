// pages/photos/[id].tsx
import { GetStaticProps, GetStaticPaths } from "next";
import { motion } from "framer-motion";
import { Album, Section, Photo } from "@/types/photo";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import albums from "@/data/photos-test.json";
import Head from "next/head";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import PhotoGrid from "@/components/PhotoGrid";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";

interface AlbumPageProps {
  name: string;
  socialLinks: SocialLink[];
  album: Album;
  prevAlbum: Album | null;
  nextAlbum: Album | null;
}

const AlbumPage = ({
  name,
  socialLinks,
  album,
  prevAlbum,
  nextAlbum,
}: AlbumPageProps) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", checkMobile);
    checkMobile();

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!nextAlbum) return;
      if (isMobile) {
        router.push(`/album/${nextAlbum?.id}`);
      }
    },
    onSwipedRight: () => {
      if (!prevAlbum) return;
      if (isMobile) {
        router.push(`/album/${prevAlbum?.id}`);
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="mx-auto">
      <Head>
        <meta property="og:image" content={album.cover} />
      </Head>
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="text-light-1 dark:text-light-1">
          {album.sections.map((section, index) => {
            return (
              <div key={index}>
                <Heading text={section.heading} />
                <PhotoGrid
                  key={index}
                  photos={section.photos}
                  path={album.id}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = albums.map((album) => ({
    params: { id: album.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<AlbumPageProps> = async ({
  params,
}) => {
  console.log("params", params);
  if (!params) {
    return { notFound: true };
  }

  const albumIndex = albums.findIndex((a) => a.id === params.id);
  console.log("albumIndex", albumIndex);

  if (albumIndex === -1) {
    return { notFound: true };
  }

  const album = albums[albumIndex];
  const prevAlbum = albumIndex > 0 ? albums[albumIndex - 1] : null;
  const nextAlbum =
    albumIndex < albums.length - 1 ? albums[albumIndex + 1] : null;

  console.log("album", album);

  if (!album) {
    return { notFound: true };
  }

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      album: JSON.parse(JSON.stringify(album)),
      prevAlbum: prevAlbum ? JSON.parse(JSON.stringify(prevAlbum)) : null,
      nextAlbum: nextAlbum ? JSON.parse(JSON.stringify(nextAlbum)) : null,
    },
    revalidate: 60,
  };
};

export default AlbumPage;
