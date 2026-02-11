import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: `Photos | ${basics.name}`,
  description: `Photo albums by ${basics.name}.`,
  openGraph: {
    images: ["https://allenhaydenjohnson.com/og-allen.png"],
  },
};

export default function PhotosPage() {
  const { name, socialLinks } = basics as {
    name: string;
    socialLinks: SocialLink[];
  };

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <div className="page-content text-base text-dark-2 dark:text-light-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 text-dark-2 dark:text-light-2">
          {(albums as Album[]).map((album, index) => {
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
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
