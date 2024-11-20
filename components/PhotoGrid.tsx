// components/PhotoGrid.tsx
import { Photo } from "@/types/photo";
import Image from "next/image";
import Link from "next/link";

interface PhotoGridProps {
  photos: Photo[];
  path: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, path }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 text-light-1 dark:text-light-1">
      {photos.map((photo) => (
        <Link
          key={photo.id} // Use photo.id as a unique key
          href={`/album/${path}/photo/${photo.id}`}
          className="cursor-pointer no-underline items-center justify-center transition ease-in-out duration-300"
        >
          <Image
            src={`/img/photos/${path}/${photo.file}`}
            alt={photo.caption || "Photo"} // Fallback for alt attribute
            width={320}
            height={240}
            className="rounded shadow-md md:transition md:duration-200 md:ease-in-out md:transform"
          />
          <h2 className="text-lg lg:text-xl flex justify-center mt-2">
            {photo.caption}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default PhotoGrid;
