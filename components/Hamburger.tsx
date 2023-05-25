// components/Hamburger.tsx
import { FiX, FiMenu } from "react-icons/fi";

interface HamburgerProps {
  showMenu: boolean;
  toggleMenu: VoidFunction;
}

const Hamburger: React.FC<HamburgerProps> = ({ showMenu, toggleMenu }) => {
  return (
    <div>
      <button
        onClick={toggleMenu}
        type="button"
        className="focus:outline-none"
        aria-label="Hamburger Menu"
      >
        {showMenu ? (
          <FiX className="text-3xl" />
        ) : (
          <FiMenu className="text-3xl" />
        )}
      </button>
    </div>
  );
};

export default Hamburger;
