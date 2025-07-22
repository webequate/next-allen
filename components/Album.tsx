// components/Album.tsx
import type { Photo, Section, Album } from "@/types/photo";
import Heading from "@/components/Heading";
import PhotoGrid from "@/components/PhotoGrid";

interface AlbumProps {
  sections: Section[];
  path: string;
}

const Album: React.FC<AlbumProps> = ({ sections, path }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 text-light-1 dark:text-light-1">
      {sections.map((section, index) => {
        return (
          <div key={index}>
            <Heading text={section.heading} />
            <PhotoGrid key={index} photos={section.photos} path={path} />
          </div>
        );
      })}
    </div>
  );
};

export default Album;
