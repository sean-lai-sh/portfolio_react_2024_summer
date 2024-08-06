import { brainwave } from "../assets";
import { navigation } from "../constants";
import { useLocation } from "react-router-dom";
import Button from "./button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
// Reusable component to have consistent header across the website
// Will simplify NextJS migration in the future
const header = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathName = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
    } else {
      setOpenNavigation(true);
    }
  };

  const handleClick = () => {
    setOpenNavigation(false);
  };

  return (
    // Make our header stick and span the entire website
    <div
      className={`top-0 left-0 w-full fixed z-50 bg-n-8/90 backdrop-blur-sm border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      {/* Flex container to center the content allowing us to place each item with appropriate spacing */}
      <div className={`flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4`}>
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="Brainwave" />
        </a>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 bottom-0 right-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.title}`}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1
                    ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 lg:-mr-0.25  lg:text-xs lg:font-semibold 
                    ${
                      item.url === pathName.hash
                        ? "z-2 lg:text-n-1"
                        : "lg:text-n-1/50"
                    } lg:leading-5 lg:hover:text-n-1 <xl:px-12></xl:px-12>`}
              >
                {item.title}
              </a>
            ))}
          </div>
          {/* Hamburger menu not in div to seperate content from actual navbar and menu during mobile expanded view */}
          <HamburgerMenu />
        </nav>
        <a
          href="#signup"
          className="transition-colors text-n-1/50 button hidden mr-8 hover:text-n-1 lg:block"
        >
          New Account
        </a>
        <Button className="hidden lg:flex">Resume</Button>
        <Button className="ml-auto lg:hidden px-3" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default header;
