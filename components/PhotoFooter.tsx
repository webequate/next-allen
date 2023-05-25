// components/PhotoFooter.tsx

interface PhotoFooterProps {
  caption: string;
}

const PhotoFooter: React.FC<PhotoFooterProps> = ({ caption }) => {
  return (
    <div className="text-center">
      <p className="text-lg mb-0">{caption}</p>
    </div>
  );
};

export default PhotoFooter;
