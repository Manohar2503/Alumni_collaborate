import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Importing icons from react-icons

import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className=''>
      <footer className="shadow-top mt-[20px] text-white py-8">
      {/* Social Media Icons Section */}
      <div className="flex justify-center mb-4">
        <div className="flex space-x-4">
          <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
            <FaFacebookF />
          </a>
          <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
            <FaTwitter />
          </a>
          <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
            <FaLinkedinIn />
          </a>
          <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Navigation Links Section */}
      <div className="flex justify-center mb-1">
        <nav className="flex space-x-8 text-sm uppercase">
          <Link to="/body"><h3  className="hover:underline text-black font-semibold">Home</h3></Link>
          <span className="text-white">|</span>
          <Link to="/events"><h3 href="#" className="hover:underline text-black font-semibold">Events</h3></Link>
          <span className="text-white">|</span>
         <Link to="alumni"> <h3 href="#" className="hover:underline text-black font-semibold">Alumni</h3></Link>
          <span className="text-white">|</span>
         <Link to="student"> <h3 href="#" className="hover:underline text-black font-semibold">Student</h3></Link>
          
        </nav>
      </div>
    </footer>
    </div>
  );
}

export default Footer;
