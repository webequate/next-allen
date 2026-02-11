import { SocialLink } from "@/types/basics";
import { Video } from "@/types/video";
import basics from "@/data/basics.json";
import videos from "@/data/videos.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface VideoPageProps {
  params: Promise<{
    videoId: string;
  }>;
}

const VideoPage = async ({ params }: VideoPageProps) => {
  const { videoId } = await params;

  const videoIndex = (videos as Video[]).findIndex((v) => v.id === videoId);

  if (videoIndex === -1) {
    return <div>Video not found</div>;
  }

  const video = (videos as Video[])[videoIndex];
  const prevVideo = videoIndex > 0 ? (videos as Video[])[videoIndex - 1] : null;
  const nextVideo =
    videoIndex < (videos as Video[]).length - 1
      ? (videos as Video[])[videoIndex + 1]
      : null;

  const { name, socialLinks } = basics as {
    name: string;
    socialLinks: SocialLink[];
  };

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
      <Header socialLink={socialLinks[0]} />

      <div className="page-content justify-center text-dark-1 dark:text-light-1">
        <VideoHeader />
        <div className="mx-auto mb-2 flex justify-center">
          <a
            href={`/video/${video.file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <video
              src={`/video/${video.file}`}
              poster={`/video/poster/${video.poster}`}
              width={640}
              height={480}
              controls
              playsInline
              className="ring-1 ring-dark-3 dark:ring-light-3"
              preload="auto"
            />
          </a>
        </div>
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export async function generateStaticParams() {
  return (videos as Video[]).map((video) => ({
    videoId: video.id,
  }));
}

export default VideoPage;
