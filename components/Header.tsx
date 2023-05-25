// components/Header.tsx
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import type { SocialLink } from "@/types/basics";
import AllensAliens from "@/components/AllensAliens";
import SocialButton from "@/components/SocialButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Hamburger from "@/components/Hamburger";

interface HeaderProps {
  socialLink: SocialLink;
}

const Header: React.FC<HeaderProps> = ({ socialLink }) => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const route = router.pathname;

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <nav>
      {/* Home link */}
      <Link
        href="/"
        title="Home"
        aria-label="Home"
        className="text-dark-1 dark:text-light-1 hover:text-accent-light dark:hover:text-accent-light mt-4 mb-2 sm:mb-2 transition duration-300"
      >
        <AllensAliens />
      </Link>

      <div className="container mx-auto px-0 py-3 mb-2 md:mb-10">
        <div className="flex justify-center items-center">
          {/* Social link button */}
          <div className="flex mr-auto">
            <SocialButton name={socialLink.name} url={socialLink.url} />
          </div>

          {/* Navigation links - Large screen */}
          <div className="hidden md:flex font-general-medium m-0 sm:p-0">
            <div className="nav-primary">
              <Link
                href="/"
                aria-label="Home"
                className={route === "/" ? "active" : ""}
              >
                Home
              </Link>
              <Link
                href="/about"
                aria-label="About"
                className={route === "/about" ? "active" : ""}
              >
                About
              </Link>
              <Link
                href="/contact"
                aria-label="Contact"
                className={route === "/contact" ? "active" : ""}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Hamburger menu - Small screen */}
          <div className="flex md:hidden">
            <Hamburger showMenu={showMenu} toggleMenu={toggleMenu} />
          </div>

          {/* Theme switcher */}
          <div className="flex ml-auto">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Navigation links - Small screen */}
        <div className={showMenu ? "nav-mobile show" : "nav-mobile"}>
          <Link
            href="/"
            aria-label="Home"
            className={route === "/" ? "active" : ""}
          >
            Home
          </Link>
          <Link
            href="/about"
            aria-label="About"
            className={route === "/about" ? "active" : ""}
          >
            About
          </Link>
          <Link
            href="/contact"
            aria-label="Contact"
            className={route === "/contact" ? "active" : ""}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
