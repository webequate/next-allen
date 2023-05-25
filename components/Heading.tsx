// components/Heading.tsx

interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h2 className="text-2xl font-bold mb-6">
      <span className="text-accent-dark dark:text-accent-light">{text}</span>
    </h2>
  );
};

export default Heading;
