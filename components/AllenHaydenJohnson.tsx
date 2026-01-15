// components/AllenHaydenJohnson.tsx
import Link from "next/link";

const AllenHaydenJohnson: React.FC = () => {
  return (
    <div className="font-general-regular flex justify-center items-center text-center">
      <div className="text-sm text-dark-2 dark:text-light-2">
        Website by{" "}
        <Link
          href="https://allenhaydenjohnson.com"
          aria-label="Allen Hayden Johnson"
          target="_blank"
          className="hover:text-accent-dark dark:hover:text-accent-light"
        >
          Allen Hayden Johnson
        </Link>
      </div>
    </div>
  );
};

export default AllenHaydenJohnson;
