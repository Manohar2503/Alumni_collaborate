import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import userImg from "../assets/avatar-icon.png";
import { UserContext } from "../Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { state, dispatch } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const RenderMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

 
    
    const handleLogout = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/users/logout`, {
        withCredentials: true, // Important to include cookies
      });
      dispatch({ type: "USER", payload: false });
      navigate("/login");
      alert("Logged out successfully!");
      } 
      catch (err) {
        console.error("Error:", err);
        alert(
          err.response && err.response.data.message
            ? err.response.data.message
            : "An error occurred while logging out. Please try again."
   )};
  };
    if (state) {
      return (
        <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
          <div>
            <figure 
              className="w-[35px] h-[35px] rounded-full cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src={userImg} className="w-full rounded-full" alt="User" />
            </figure>
            
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <div className="py-1">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <button className="bg-black py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] hover:bg-green-600 hover:text-black transition-colors duration-300">
              Login
            </button>
          </Link>
        </div>
      );
    }
  };

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="shadow-md w-full main_container bg-[#F0F8FF]" ref={headerRef}>
        <div className="flex justify-between items-center px-7 md:px-9">
          <div className="flex p-0 m-0 items-center sm:text-lg md:text-2xl">
            <img src={logo} alt="Logo" className="h-[3rem] w-[3rem]" />
            <p>AlumniNexus</p>
          </div>

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

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="w-8 h-8 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

          <RenderMenu />
        </div>

        {/* Menu for mobile view */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col text-lg text-white px-6 py-4 space-y-4 bg-black">
            <Link to="/" onClick={handleLinkClick}><li>Home</li></Link>
            <Link to='/aboutpage' onClick={handleLinkClick}><li>About</li></Link>
            <Link to='/donations' onClick={handleLinkClick}><li>Donations</li></Link>
            <Link to='/mentor' onClick={handleLinkClick}><li>Mentors</li></Link>
            <Link to="/learning" onClick={handleLinkClick}><li>Learning Path</li></Link>
            <Link to='/jobs' onClick={handleLinkClick}><li>Jobs</li></Link>
            <Link to='/events' onClick={handleLinkClick}><li>Events</li></Link>
            <Link to='newsMain' onClick={handleLinkClick}><li>News</li></Link>
            <li onClick={handleLinkClick}>IdeaRoom</li>
            <Link to="/contact">
              <li onClick={handleLinkClick}>Contact</li>
            </Link>
            <Link to="/login" onClick={handleLinkClick}>
              <button className="bg-black py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] mt-4">
                Login
              </button>
            </Link>
          </ul>
        </div>

        {/* Menu for desktop view */}
        <div className="hidden list-none md:flex justify-between mx-6 my-2 p-4 text-lg">
          <Link to="/" onClick={handleLinkClick}>
            <li className="relative no-underline cursor-pointer group">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full "></span>
            </li>
          </Link>

          <Link to='/aboutpage' onClick={handleLinkClick}>
            <li className="relative no-underline cursor-pointer group">
              About
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <Link to='/donations' onClick={handleLinkClick}>
            <li className="relative no-underline cursor-pointer group">
              Donations
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <Link to='/mentor' onClick={handleLinkClick}>
            <li className="relative no-underline cursor-pointer group">
              Mentors
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <Link to="/learning" onClick={handleLinkClick}>
            <li className="relative no-underline cursor-pointer group">
              Learning Path
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <Link to='/jobs' onClick={handleLinkClick}>
            <li className="relative no-underline cursor-pointer group">
              Jobs
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <Link to='/events' onClick={handleLinkClick}>
            <li className="relative no-underline cursor-pointer group">
              Events
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <Link to='newsMain' onClick={handleLinkClick}>
            <li className="relative no-underline cursor-pointer group">
              News
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>

          <li onClick={handleLinkClick} className="relative no-underline cursor-pointer group">
            IdeaRoom
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </li>

          <Link to='/contact' onClick={handleLinkClick}>
            <li className="relative no-underline cursor-pointer group">
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;