// components/PhotoHeader.tsx
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

interface PhotoHeaderProps {
  title: string;
  prevId?: number;
  nextId?: number;
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
      {prevId ? (
        <Link
          href={`/album/${path}/photo/${prevId}`}
          title="Previous Photo"
          aria-label="Previous Photo"
          className="mr-2"
        >
          <FaArrowLeft className="sm:hover:text-accent-dark sm:dark:hover:text-accent-light" />
        </Link>
      ) : (
        <div className="invisible">
          <FaArrowLeft />
        </div>
      )}
      <h2 className="text-center mb-2">{title}</h2>
      {nextId ? (
        <Link
          href={`/album/${path}/photo/${nextId}`}
          title="Next Photo"
          aria-label="Next Photo"
          className="ml-2"
        >
          <FaArrowRight className="sm:hover:text-accent-dark sm:dark:hover:text-accent-light" />
        </Link>
      ) : (
        <div className="invisible">
          <FaArrowRight />
        </div>
      )}
    </div>
  );
};

export default PhotoHeader;
