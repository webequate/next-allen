import { Metadata } from "next";
import { SocialLink } from "@/types/basics";
import { Video } from "@/types/video";
import basics from "@/data/basics.json";
import videos from "@/data/videos.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: `Videos | ${basics.name}`,
  description: `Video archive by ${basics.name}.`,
  openGraph: {
    images: ["https://allenhaydenjohnson.com/og-allen.png"],
  },
};

export default function VideosPage() {
  const { name, socialLinks } = basics as {
    name: string;
    socialLinks: SocialLink[];
  };

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <div className="page-content text-base text-dark-2 dark:text-light-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 text-dark-2 dark:text-light-2">
          {(videos as Video[]).map((video) => {
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
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
