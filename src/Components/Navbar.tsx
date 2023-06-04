import { useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

interface Props {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ darkMode, setDarkMode }: Props) {
  const [navOpen, setNavOpen] = useState<boolean>(false);

  const handleNavClick = () => {
    setNavOpen(!navOpen);
  };

  const handleModeClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 w-[min(96%,802px)] mx-auto flex justify-between items-center px-5 py-3 z-20 bg-white dark:bg-gray-800 shadow-md rounded select-none">
        <div className="flex gap-3 cursor-pointer">
          <img className=" w-8" src="chat.ico" alt="logo" />
          <h2 className=" text-xl font-bold text-orange-600 select-none">
            wee-hub
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex md:hidden">
            {navOpen ? (
              <FaTimes className="text-orange-600 " onClick={handleNavClick} />
            ) : (
              <FaBars className="text-orange-600 " onClick={handleNavClick} />
            )}
          </div>
          <div className=" hidden md:flex">Desktop</div>
          <div className=" bg-gray-800 dark:bg-white p-1 rounded-full">
            {darkMode ? (
              <FaSun className="text-gray-800" onClick={handleModeClick} />
            ) : (
              <FaMoon className="text-white" onClick={handleModeClick} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
