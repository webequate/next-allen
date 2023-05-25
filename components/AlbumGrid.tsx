// components/AlbumGrid.tsx
import { Photo, Section, Album } from "@/types/album";
import Image from "next/image";
import Link from "next/link";

interface AlbumGridProps {
  albums: Album[];
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 text-light-1 dark:text-light-1">
      {albums.map((album, index) => {
        return (
          <Link
            key={index}
            href={`/photos/albums/${album.id}`}
            className="group relative cursor-pointer"
          >
            <Image
              src={album.cover}
              alt={album.title}
              width={320}
              height={240}
              className="rounded shadow-md md:transition md:duration-200 md:ease-in-out md:transform"
            />
            <div className="absolute inset-0 bg-black opacity-0 md:group-hover:opacity-50 transition duration-200 rounded shadow-md"></div>
            <div className="absolute inset-0 items-center justify-center opacity-0 md:group-hover:opacity-100 transition duration-200 p-4">
              <h2 className="text-xl mb-2">{album.title}</h2>
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

export default AlbumGrid;
