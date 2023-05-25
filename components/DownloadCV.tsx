// components/DownloadCV.tsx
import Link from "next/link";
import { FaDownload } from "react-icons/fa";

interface DownloadCVProps {
  resumelink: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ resumelink }) => {
  return (
    <Link
      href={`${resumelink}`}
      className="w-56 font-general-medium flex justify-center items-center text-light-1 dark:text-light-1 hover:text-light-1 dark:hover:text-light-1 bg-accent-dark dark:bg-accent-dark hover:bg-accent-light dark:hover:bg-accent-light ring-1 ring-dark-3 dark:ring-light-3 py-2.5 sm:py-3 rounded-lg duration-300"
      aria-label="Download CV"
    >
      <FaDownload className="ml-0 sm:ml-1 mr-2 sm:mr-3 h-6 w-6"></FaDownload>
      <span className="text-lg">Download CV</span>
    </Link>
  );
};

export default DownloadCV;
