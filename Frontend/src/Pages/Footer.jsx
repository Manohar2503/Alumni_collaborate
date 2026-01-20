import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full mt-6 bg-[#fff7ed] border-t border-orange-200 shadow-top">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Social Media Icons */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-5">
          <a
            href="#"
            className="bg-[#c2410c] text-white p-2 rounded-full hover:bg-orange-700 transition"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="bg-[#c2410c] text-white p-2 rounded-full hover:bg-orange-700 transition"
          >
            <FaTwitter />
          </a>

          <a
            href="#"
            className="bg-[#c2410c] text-white p-2 rounded-full hover:bg-orange-700 transition"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="#"
            className="bg-[#c2410c] text-white p-2 rounded-full hover:bg-orange-700 transition"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:text-[15px] font-semibold uppercase text-black">
          <Link to="/body" className="hover:text-[#c2410c] transition">
            Home
          </Link>

          <Link to="/events" className="hover:text-[#c2410c] transition">
            Events
          </Link>

          <Link to="/alumni" className="hover:text-[#c2410c] transition">
            Alumni
          </Link>

          <Link to="/student" className="hover:text-[#c2410c] transition">
            Student
          </Link>
        </nav>

        {/* Bottom Text */}
        <p className="text-center text-[12px] sm:text-[13px] text-gray-600 mt-4">
          © {new Date().getFullYear()} VVIT AlumniNexus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
