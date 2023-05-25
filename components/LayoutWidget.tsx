// components/LayoutWidget.tsx
import { FaSun } from "react-icons/fa";

const LayoutWidget = () => {
  return (
    <div className="text-xl text-dark-2 dark:text-light-2 bg-light-1 dark:bg-dark-1 ring-1 ring-dark-3 dark:ring-light-3 p-3 ml-0 rounded-xl">
      <FaSun className="text-xl" />
    </div>
  );
};

export default LayoutWidget;
