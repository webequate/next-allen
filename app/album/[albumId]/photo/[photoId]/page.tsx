import { SocialLink } from "@/types/basics";
import { Album, Photo } from "@/types/photo";
import basics from "@/data/basics.json";
import albums from "@/data/photos.json";
import Header from "@/components/Header";
import PhotoHeader from "@/components/PhotoHeader";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaReply } from "react-icons/fa";

interface PhotoPageProps {
  params: Promise<{
    albumId: string;
    photoId: string;
  }>;
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  const { albumId, photoId } = await params;

  const album = (albums as Album[]).find((a) => a.id === albumId);

  if (!album) {
    return <div>Album not found</div>;
  }

  const photos = album.sections.flatMap((section) => section.photos);
  const photoIndex = photos.findIndex((p) => p.id.toString() === photoId);

  if (photoIndex === -1) {
    return <div>Photo not found</div>;
  }

  const photo = photos[photoIndex];
  const prevPhoto = photoIndex > 0 ? photos[photoIndex - 1] : null;
  const nextPhoto =
    photoIndex < photos.length - 1 ? photos[photoIndex + 1] : null;

  const { name, socialLinks } = basics as {
    name: string;
    socialLinks: SocialLink[];
  };

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <div className="page-content justify-center text-dark-1 dark:text-light-1">
        <div className="mb-4">
          <Link
            href={`/album/${albumId}`}
            className="inline-flex items-center gap-2 text-lg hover:text-accent-dark dark:hover:text-accent-light transition duration-300"
            aria-label="Back to Album"
          >
            <FaReply />
            <span>Back to Album</span>
          </Link>
        </div>
        <PhotoHeader
          title={photo.caption}
          prevId={prevPhoto?.id}
          nextId={nextPhoto?.id}
          path={`${albumId}`}
        />
        <div className="mx-auto mb-2 flex justify-center max-w-full">
          <a
            href={`/img/photos/${albumId}/${photo.file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`/img/photos/${albumId}/${photo.file}`}
              alt={photo.caption}
              width={800}
              height={600}
              sizes="100vw"
              priority
              className="ring-1 ring-dark-3 dark:ring-light-3 object-contain max-w-full h-auto"
            />
          </a>
        </div>
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export async function generateStaticParams() {
  const allAlbums: Album[] = albums as Album[];
  const paths: Array<{ albumId: string; photoId: string }> = [];

  allAlbums.forEach((album) => {
    if (!album.id) return;
    album.sections.forEach((section) => {
      section.photos.forEach((photo) => {
        if (!photo.id) return;
        paths.push({
          albumId: album.id,
          photoId: String(photo.id),
        });
      });
    });
  });

  return paths;
}

export default PhotoPage;
