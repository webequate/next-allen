// pages/video/[videoId].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { motion } from "framer-motion";
import { SocialLink } from "@/types/basics";
import { Video } from "@/types/video";
import basics from "@/data/basics.json";
import videos from "@/data/videos.json";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface VideoProps {
  video: Video;
  prevVideo: Video | null;
  nextVideo: Video | null;
  name: string;
  socialLinks: SocialLink[];
}

interface VideoParams extends ParsedUrlQuery {
  videoId: string;
}

const VideoPage = ({
  video,
  prevVideo,
  nextVideo,
  name,
  socialLinks,
}: VideoProps) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", checkMobile);
    checkMobile();

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!nextVideo) return;
      if (isMobile) {
        router.push(`/video/${nextVideo.id}`);
      }
    },
    onSwipedRight: () => {
      if (!prevVideo) return;
      if (isMobile) {
        router.push(`/video/${prevVideo.id}`);
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  const VideoHeader = () => (
    <div className="flex justify-between text-lg sm:text-xl md:text-2xl mb-4">
      <div className="mr-2">
        {prevVideo ? (
          <Link
            href={`/video/${prevVideo.id}`}
            title="Previous Video"
            aria-label="Previous Video"
          >
            <FaArrowLeft className="sm:hover:text-accent-dark sm:dark:hover:text-accent-light" />
          </Link>
        ) : (
          <FaArrowLeft className="opacity-0 pointer-events-none" />
        )}
      </div>
      <h2 className="text-center mb-2">{video.title}</h2>
      <div className="ml-2">
        {nextVideo ? (
          <Link
            href={`/video/${nextVideo.id}`}
            title="Next Video"
            aria-label="Next Video"
          >
            <FaArrowRight className="sm:hover:text-accent-dark sm:dark:hover:text-accent-light" />
          </Link>
        ) : (
          <FaArrowRight className="opacity-0 pointer-events-none" />
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
      <Head>
        <meta property="og:type" content="video" />
        <meta property="og:video" content={`/video/${video.file}`} />
        <meta property="og:image" content={`/video/poster/${video.poster}`} />
        <title>{video.title}</title>
      </Head>
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="justify-center text-dark-1 dark:text-light-1">
          <VideoHeader />
          <video
            {...handlers}
            src={`/video/${video.file}`}
            poster={`/video/poster/${video.poster}`}
            width={640}
            height={480}
            controls
            className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-2"
            preload="auto"
          />
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<VideoParams> = async () => {
  const paths = videos.map((video) => ({
    params: { videoId: video.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<VideoProps, VideoParams> = async ({
  params,
}) => {
  if (!params || Array.isArray(params.videoId)) {
    return { notFound: true };
  }

  const videoIndex = videos.findIndex((v) => v.id === params.videoId);

  if (videoIndex === -1) {
    return { notFound: true };
  }

  const video = videos[videoIndex];
  const prevVideo = videoIndex > 0 ? videos[videoIndex - 1] : null;
  const nextVideo =
    videoIndex < videos.length - 1 ? videos[videoIndex + 1] : null;

  return {
    props: {
      video: JSON.parse(JSON.stringify(video)),
      prevVideo: prevVideo ? JSON.parse(JSON.stringify(prevVideo)) : null,
      nextVideo: nextVideo ? JSON.parse(JSON.stringify(nextVideo)) : null,
      name: basics.name,
      socialLinks: basics.socialLinks,
    },
    revalidate: 60,
  };
};

export default VideoPage;
