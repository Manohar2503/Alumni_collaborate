import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div
      ref={headerRef}
      className="shadow-md w-full bg-[#F0F8FF]"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center px-7 md:px-9 h-[70px]">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-semibold">
          <img src={logo} alt="Logo" className="h-[3rem] w-[3rem]" />
          <span>AlumniNexus</span>
        </div>

        {/* College Name */}
        <div className="w-[100px] flex md:mr-40">
            <h1 className="text-2xl md:text-7xl font-bold justify-center text-center text-[#c2410c] drop-shadow-md hover:drop-shadow-x transition-all duration-300 ease-in-out transform hover:scale-110 font-serif">
              VVIT
            </h1>
            <div className="hidden md:block md:space-y-[6px] md:mx-1 md:h-[20px] md:pt-1">
              <h5 className="h-[8px] font-serif drop-shadow-md">vasireddy</h5>
              <h5 className="h-[8px] font-serif drop-shadow-md">venkatadri</h5>
              <h5 className="h-[8px] font-serif drop-shadow-md">institute of</h5>
              <h5 className="h-[8px] font-serif drop-shadow-md">technology</h5>
            </div>
          </div>

        {/* Desktop Login */}
        <div className="hidden md:flex">
          <Link to="/login">
            <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 hover:text-black transition">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black px-6 py-4">
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            <button className="w-full bg-white text-black py-2 rounded-full font-semibold">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
