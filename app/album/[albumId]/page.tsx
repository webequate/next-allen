import { Metadata } from "next";
import Link from "next/link";

import { SocialLink } from "@/types/basics";
import { Album } from "@/types/photo";
import albums from "@/data/photos.json";
import basics from "@/data/basics.json";

import Header from "@/components/Header";
import Heading from "@/components/Heading";
import PhotoGrid from "@/components/PhotoGrid";
import Footer from "@/components/Footer";

interface AlbumProps {
  params: Promise<{
    albumId: string;
  }>;
}

const AlbumPage = async ({ params }: AlbumProps) => {
  const { albumId } = await params;
  const albumIndex = (albums as Album[]).findIndex((a) => a.id === albumId);

  if (albumIndex === -1) {
    return <div>Album not found</div>;
  }

  const album = (albums as Album[])[albumIndex];
  const prevAlbum = albumIndex > 0 ? (albums as Album[])[albumIndex - 1] : null;
  const nextAlbum =
    albumIndex < (albums as Album[]).length - 1
      ? (albums as Album[])[albumIndex + 1]
      : null;

  const { name, socialLinks } = basics as {
    name: string;
    socialLinks: SocialLink[];
  };

  const AlbumNavigation = () => (
    <div className="flex justify-between items-center mb-6 text-base">
      <div className="flex-1">
        {prevAlbum && (
          <Link
            href={`/album/${prevAlbum.id}`}
            className="text-dark-1 dark:text-light-1 hover:text-dark-3 dark:hover:text-light-2 transition-colors"
          >
            ← {prevAlbum.title}
          </Link>
        )}
      </div>
      <div className="flex-1 text-right">
        {nextAlbum && (
          <Link
            href={`/album/${nextAlbum.id}`}
            className="text-dark-1 dark:text-light-1 hover:text-dark-3 dark:hover:text-light-2 transition-colors"
          >
            {nextAlbum.title} →
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <AlbumNavigation />

      <div className="page-content text-light-1 dark:text-light-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-dark-1 dark:text-light-1">
          {album.title}
        </h1>
        {album.sections.map((section, index) => (
          <div
            key={index}
            className="border border-dark-3 dark:border-light-3 p-4 mb-10"
          >
            {album.sections.length > 1 && <Heading text={section.heading} />}
            <PhotoGrid photos={section.photos} path={album.id} />
          </div>
        ))}
      </div>

      <AlbumNavigation />

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export async function generateMetadata({
  params,
}: AlbumProps): Promise<Metadata> {
  const { albumId } = await params;
  const album = (albums as Album[]).find((a) => a.id === albumId);

  if (!album) {
    return {
      title: "Album not found",
    };
  }

  return {
    title: `${album.title} | ${basics.name}`,
    description: album.description || `${album.title} photo album.`,
    openGraph: {
      images: [`https://allenhaydenjohnson.com/img/album/${album.cover}`],
    },
  };
}

export async function generateStaticParams() {
  return (albums as Album[]).map((album) => ({
    albumId: album.id,
  }));
}

export default AlbumPage;
