// components/PhotoGrid.tsx
import { Photo, Section, Album } from "@/types/photo";
import Image from "next/image";
import Link from "next/link";

interface PhotoGridProps {
  photos: Photo[];
  path: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, path }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 text-light-1 dark:text-light-1">
      {photos.map((photo, index) => {
        return (
          <Link
            key={index}
            href={`/album/${path}/photo/${photo.id}`}
            className="group relative cursor-pointer"
          >
            <Image
              src={`/${path}/${photo.file}`}
              alt={photo.caption}
              width={320}
              height={240}
              className="rounded shadow-md md:transition md:duration-200 md:ease-in-out md:transform"
            />
            <div className="absolute inset-0 bg-black opacity-0 md:group-hover:opacity-50 transition duration-200 rounded shadow-md"></div>
            <div className="absolute inset-0 items-center justify-center opacity-0 md:group-hover:opacity-100 transition duration-200 p-4">
              <h2 className="text-xl mb-2">{photo.caption}</h2>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 md:group-hover:opacity-100 transition duration-200">
              <span className="text-4xl">+</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
