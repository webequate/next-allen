// pages/album/[id]/photo/[id].tsx
import { GetStaticProps, GetStaticPaths } from "next";
import { motion } from "framer-motion";
import { Album, Section, Photo } from "@/types/photo";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import albums from "@/data/photos-test.json";
import Head from "next/head";
import Header from "@/components/Header";
import PhotoHeader from "@/components/PhotoHeader";
import Image from "next/image";
import PhotoFooter from "@/components/PhotoFooter";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";

type Path = {
  params: {
    albumId: string;
    photoId: string;
  }
};

interface PhotoProps {
  albumId: string;
  name: string;
  socialLinks: SocialLink[];
  photo: Photo;
  prevPhoto: Photo | null;
  nextPhoto: Photo | null;
}

const Photo = ({ albumId, name, socialLinks, photo, prevPhoto, nextPhoto }: PhotoProps) => {
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
      if (!nextPhoto) return;
      if (isMobile) {
        router.push(`/album/${albumId}/photo/${nextPhoto?.id}`);
      }
    },
    onSwipedRight: () => {
      if (!prevPhoto) return;
      if (isMobile) {
        router.push(`/album/${albumId}/photo/${prevPhoto?.id}`);
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="mx-auto">
      <Head>
        <meta
          property="og:image"
          content={photo.file}
        />
      </Head>
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="justify-center text-dark-1 dark:text-light-1">
          <PhotoHeader
            title={photo.caption}
            prevId={prevPhoto?.id}
            nextId={nextPhoto?.id}
            path="posts"
          />
          <Image
            {...handlers}
            src={photo.file}
            alt={photo.caption}
            width={600}
            height={600}
            priority
            className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-2"
          />
          <PhotoFooter caption={photo.caption} />
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Path[] = [];

  // Loop over all albums
  albums.forEach(album => {
    // Loop over all sections in each album
    album.sections.forEach(section => {
      // Loop over all photos in each section
      section.photos.forEach(photo => {
        paths.push({
          params: { 
            albumId: album.id, 
            photoId: photo.id.toString(),
          }
        });
      });
    });
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PhotoProps, { albumId: string; photoId: string }> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const album = albums.find(album => album.id.toString() === params.albumId);

  if (!album) {
    return { notFound: true };
  }

  const photos = album.sections.flatMap(section => section.photos);

  const photoIndex = photos.findIndex(p => p.id.toString() === params.photoId);

  if (photoIndex === -1) {
    return { notFound: true };
  }

  const photo = photos[photoIndex];
  const prevPhoto = photoIndex > 0 ? photos[photoIndex - 1] : null;
  const nextPhoto = photoIndex < photos.length - 1 ? photos[photoIndex + 1] : null;

  if (!photo) {
    return { notFound: true };
  }

  return {
    props: {
      albumId: params.albumId,
      name: basics.name,
      socialLinks: basics.socialLinks,
      photo: JSON.parse(JSON.stringify(photo)),
      prevPhoto: prevPhoto ? JSON.parse(JSON.stringify(prevPhoto)) : null,
      nextPhoto: nextPhoto ? JSON.parse(JSON.stringify(nextPhoto)) : null,
    },
    revalidate: 60,
  };
};

export default Photo;
