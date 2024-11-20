// pages/album/[albumId]/photo/[photoId].tsx
console.log("pages/album/[albumId]/photo/[photoId].tsx");
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { motion } from "framer-motion";
import { SocialLink } from "@/types/basics";
import { Album, Photo, Section } from "@/types/photo";
import basics from "@/data/basics.json";
import albums from "@/data/photos.json";
import Head from "next/head";
import Header from "@/components/Header";
import PhotoHeader from "@/components/PhotoHeader";
import Image from "next/image";
import PhotoFooter from "@/components/PhotoFooter";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";

interface PhotoProps {
  photo: Photo;
  prevPhoto: Photo | null;
  nextPhoto: Photo | null;
  name: string;
  socialLinks: SocialLink[];
}

interface PhotoParams extends ParsedUrlQuery {
  albumId: string;
  photoId: string;
}

const PhotoPage = ({
  photo,
  prevPhoto,
  nextPhoto,
  name,
  socialLinks,
}: PhotoProps) => {
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

  const { albumId } = router.query;

  // Debugging logs
  useEffect(() => {
    console.log("Album ID:", albumId);
    console.log("Previous Photo:", prevPhoto);
    console.log("Next Photo:", nextPhoto);
  }, [albumId, prevPhoto, nextPhoto]);

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
        <meta property="og:image" content={photo.file} />
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
            path={`${albumId}`}
          />
          <Image
            {...handlers}
            src={`/img/photos/${albumId}/${photo.file}`}
            alt={photo.caption}
            width={800}
            height={800}
            priority
            className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-2 max-w-[1000px] max-h-[800px] object-contain"
          />
          <PhotoFooter caption={photo.caption} />
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<PhotoParams> = async () => {
  const allAlbums: Album[] = albums;

  let paths: { params: PhotoParams }[] = [];

  allAlbums.forEach((album) => {
    if (!album.id) return;
    album.sections.forEach((section) => {
      section.photos.forEach((photo) => {
        if (!photo.id) return;
        paths.push({
          params: {
            albumId: album.id,
            photoId: String(photo.id),
          },
        });
      });
    });
  });

  console.log("Generated paths:", paths);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PhotoProps, PhotoParams> = async ({
  params,
}) => {
  console.log("Params received:", params);

  if (
    !params ||
    Array.isArray(params.albumId) ||
    Array.isArray(params.photoId)
  ) {
    console.log("Invalid params:", params);
    return { notFound: true };
  }

  const album = albums.find((a) => a.id === params.albumId);
  console.log("Album found:", album);

  if (!album) {
    console.log("Album not found for ID:", params.albumId);
    return { notFound: true };
  }

  const photos = album.sections.flatMap((section) => section.photos);
  const photoIndex = photos.findIndex(
    (p) => p.id.toString() === params.photoId
  );

  console.log("Photos in album:", photos);
  console.log("Photo index:", photoIndex);

  if (photoIndex === -1) {
    console.log("Photo not found for ID:", params.photoId);
    return { notFound: true };
  }

  const photo = photos[photoIndex];
  const prevPhoto = photoIndex > 0 ? photos[photoIndex - 1] : null;
  const nextPhoto =
    photoIndex < photos.length - 1 ? photos[photoIndex + 1] : null;

  console.log("Current photo:", photo);
  console.log("Previous photo:", prevPhoto);
  console.log("Next photo:", nextPhoto);

  return {
    props: {
      photo,
      prevPhoto,
      nextPhoto,
      name: basics.name,
      socialLinks: basics.socialLinks,
    },
  };
};

export default PhotoPage;
