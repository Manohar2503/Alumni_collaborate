import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const headerRef = useRef(null);

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="w-full shadow-md bg-[#fff7ed] border-b border-orange-200"
    >
      <div className="flex items-center justify-between h-[64px] sm:h-[70px] px-3 sm:px-6 md:px-10">
        {/* ✅ Desktop/Tablet AlumniNexus -> Home */}
        <Link
          to="/body"
          className="hidden sm:flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] rounded-full"
          />

          <div className="min-w-0">
            <h1 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-black leading-tight truncate">
              AlumniNexus
            </h1>
            <p className="text-[10px] sm:text-[11px] text-gray-600 leading-tight truncate">
              Alumni Engagement Platform
            </p>
          </div>
        </Link>

        {/* ✅ Mobile VVIT -> Home */}
        <Link
          to="/body"
          className="flex sm:hidden items-start gap-2 min-w-0 cursor-pointer"
        >
          <h1 className="text-[50px] font-extrabold text-[#c2410c] font-serif leading-none">
            VVIT
          </h1>

          <div className="flex flex-col leading-[12px] mt-[2px]">
            <p className="text-[10px] font-serif text-gray-800 drop-shadow-sm">
              vasireddy
            </p>
            <p className="text-[10px] font-serif text-gray-800 drop-shadow-sm">
              venkatadri
            </p>
            <p className="text-[10px] font-serif text-gray-800 drop-shadow-sm">
              institute of
            </p>
            <p className="text-[10px] font-serif text-gray-800 drop-shadow-sm">
              technology
            </p>
          </div>
        </Link>

        {/* ✅ Center VVIT (desktop) -> Home */}
        <div className="hidden sm:flex items-center justify-center flex-1">
          <Link to="/body" className="flex items-center gap-2 cursor-pointer">
            <h1 className="text-[26px] sm:text-[36px] md:text-[66px] font-extrabold text-[#c2410c] drop-shadow-md font-serif leading-none">
              VVIT
            </h1>

            <div className="hidden md:block space-y-[2px] leading-none">
              <p className="text-[12px] font-serif text-gray-800 drop-shadow-sm">
                vasireddy
              </p>
              <p className="text-[12px] font-serif text-gray-800 drop-shadow-sm">
                venkatadri
              </p>
              <p className="text-[12px] font-serif text-gray-800 drop-shadow-sm">
                institute of
              </p>
              <p className="text-[12px] font-serif text-gray-800 drop-shadow-sm">
                technology
              </p>
            </div>
          </Link>
        </div>

        {/* ✅ Login */}
        <div className="flex items-center">
          <Link to="/login">
            <button className="bg-[#c2410c] text-white px-4 sm:px-5 py-2 rounded-full text-[12px] sm:text-[20px] font-semibold shadow-md hover:bg-orange-700 transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
