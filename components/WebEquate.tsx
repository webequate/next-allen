// components/WebEquate.tsx
import Link from "next/link";

const WebEquate: React.FC = () => {
  return (
    <div className="font-general-regular flex justify-center items-center text-center">
      <div className="text-sm text-dark-2 dark:text-light-2">
        Website by{" "}
        <Link
          href="https://webequate.com"
          aria-label="WebEquate"
          target="_blank"
          className="hover:text-accent-dark dark:hover:text-accent-light"
        >
          WebEquate
        </Link>
      </div>
    </div>
  );
};

export default WebEquate;
