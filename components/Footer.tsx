// components/Footer.tsx
import { SocialLink } from "@/types/basics";
import Social from "@/components/Social";
import Copyright from "@/components/Copyright";
import WebEquate from "@/components/WebEquate";
import Link from "next/link";

interface FooterProps {
  name: string;
  socialLinks: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ name, socialLinks }) => {
  return (
    <div className="mx-auto">
      <div className="pb-8 mt-4 border-t-2 border-light-1 dark:border-dark-2">
        <div>
          {/* Footer links - large screen */}
          <div className="m-0 mt-8 hidden sm:flex sm:p-0 justify-center items-center">
            <div className="nav-secondary">
              <Link href="/" aria-label="Home">
                Home
              </Link>
              <Link href="/about" aria-label="About">
                About
              </Link>
              <Link href="/contact" aria-label="Contact">
                Contact Me
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-4">
            <Social socialLinks={socialLinks} />
          </div>
          <div className="flex justify-center">
            <Copyright name={name} />
          </div>
          <div className="flex justify-center">
            <WebEquate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
