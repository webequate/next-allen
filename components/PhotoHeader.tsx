// components/PhotoHeader.tsx
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

interface Photo {
  id: number;
  file: string;
  caption: string;
}

interface PhotoHeaderProps {
  title: string;
  prevId?: number | null;
  nextId?: number | null;
  path: string;
}

const PhotoHeader: React.FC<PhotoHeaderProps> = ({
  title,
  prevId,
  nextId,
  path,
}) => {
  return (
    <div className="flex justify-between text-lg sm:text-xl md:text-2xl">
      <div className="mr-2">
        {prevId ? (
          <Link
            href={`/album/${path}/photo/${prevId}`}
            title="Previous Photo"
            aria-label="Previous Photo"
          >
            <FaArrowLeft className="sm:hover:text-accent-dark sm:dark:hover:text-accent-light" />
          </Link>
        ) : (
          <FaArrowLeft className="opacity-0 pointer-events-none" />
        )}
      </div>
      <h2 className="text-center mb-2">{title}</h2>
      <div className="ml-2">
        {nextId ? (
          <Link
            href={`/album/${path}/photo/${nextId}`}
            title="Next Photo"
            aria-label="Next Photo"
          >
            <FaArrowRight className="sm:hover:text-accent-dark sm:dark:hover:text-accent-light" />
          </Link>
        ) : (
          <FaArrowRight className="opacity-0 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default PhotoHeader;
