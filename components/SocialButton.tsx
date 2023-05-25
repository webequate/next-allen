// components/SocialButton.tsx
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

interface SocialButtonProps {
  name: string;
  url: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ name, url }) => {
  const iconFromName = (name: string) => {
    switch (name) {
      case "facebook":
        return <FaFacebook />;
      case "github":
        return <FaGithub />;
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedin />;
      case "twitter":
        return <FaTwitter />;
      case "youtube":
        return <FaYoutube />;
      default:
        return <FaFacebook />;
    }
  };

  return (
    <Link
      href={url}
      target="_blank"
      title={name}
      aria-label={name}
      className={`font-general-regular text-3xl text-dark-2 dark:text-light-2 sm:hover:text-light-1 sm:dark:hover:text-light-1 bg-light-1 dark:bg-dark-1 sm:hover:bg-accent-light sm:dark:hover:bg-accent-light ring-1 ring-dark-3 dark:ring-light-3 cursor-pointer rounded-lg p-2 duration-300`}
    >
      {iconFromName(name)}
    </Link>
  );
};

export default SocialButton;
