import { useState } from "react";
import { Logo } from "../assets/image";
import { Hamburger } from "../assets/svg";
import { Navigation } from "./card";

function Header() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleHamburger = () => {
    setOpen((prev) => !prev);
  };

  const closeNavigation = () => {
    setOpen(false);
  };

  return (
    <div className="relative w-screen sm:h-20 h-16 bg-primary py-2 px-5 flex justify-center items-center z-50">
      <img
        src={Logo}
        alt="Logo"
        className="h-full aspect-square overflow-hidden rounded-full shadow-lg"
      />
      <span
        className="ml-auto cursor-pointer sm:scale-150"
        onClick={handleHamburger}
      >
        <img src={Hamburger} alt="Hamburger" />
      </span>
      <ol
        className={`absolute top-full z-50 left-0 right-0 ${
          !isOpen ? "scale-y-0 -translate-y-1/2" : ""
        } transition-all duration-200`}
      >
        <span
          className="fixed top-0 left-0 right-0 bottom-0 -z-10"
          onClick={() => setOpen(false)}
        />
        {Array.from(Array(5), (i) => {
          return <Navigation closeNav={closeNavigation} />;
        })}
      </ol>
    </div>
  );
}

export default Header;
