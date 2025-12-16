import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import userImg from "../assets/avatar-icon.png";
import { UserContext } from "../Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiHome, FiBell, FiMessageCircle, FiBriefcase, FiSearch } from "react-icons/fi";

const Header = () => {
  const { state, dispatch } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
          withCredentials: true,
        });
        dispatch({ type: "USER", payload: false });
        navigate("/login");
        alert("Logged out successfully!");
      } catch (err) {
        console.error("Error:", err);
        alert(
          err.response && err.response.data.message
            ? err.response.data.message
            : "An error occurred while logging out. Please try again."
        );
      }
            dispatch({ type: "USER", payload: null });
          };

    const isProfilePage = location.pathname === "/profile";

    const IconNav = ({ icon, to, label }) => (
      <div
        onClick={() => navigate(to)}
        className="hidden md:flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#0A66C2]"
      >
        {icon}
        <span className="text-sm hidden md:block">{label}</span>
      </div>
    );

    // On profile page show header-style icons (no Profile button)
    if (isProfilePage) {
      return (
        <div className="hidden md:flex items-center gap-6">
          <IconNav icon={<FiHome size={20} />} to="/alumni-page" label="Home" />
          <IconNav icon={<FiBriefcase size={20} />} to="/jobs" label="Jobs" />
          <IconNav icon={<FiMessageCircle size={20} />} to="/messaging" label="Messaging" />
          <IconNav icon={<FiBell size={20} />} to="/notifications" label="Notifications" />
        </div>
      );
    }

    // Default behavior for other pages
    if (state && state.user) {
      return (
        <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] hover:bg-blue-700 transition-colors duration-300"
          >
            Profile
          </button>
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
                    My Profile
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

  // Pages that should use the clean navbar instead of the full header
  const useCleanNavbar = ["/profile", "/jobs", "/notifications", "/messaging"];
  const shouldUseCleanNavbar = useCleanNavbar.includes(location.pathname);

  // Clean navbar component
  const CleanNavbar = () => (
    <div style={{ width: "100%", backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", gap: "20px" }}>
        <div style={{ fontSize: "20px", color: "#0A66C2", fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/alumni-page")}>
          Alumni
        </div>

        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#f0f0f0", borderRadius: "24px", padding: "8px 16px", flex: 1, maxWidth: "300px" }}>
          <FiSearch style={{ color: "#999", marginRight: "8px" }} />
          <input
            type="text"
            placeholder="Search alumni, posts..."
            style={{ backgroundColor: "transparent", border: "none", outline: "none", width: "100%", fontSize: "14px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <NavbarIcon icon={<FiHome />} label="Home" onClick={() => navigate("/alumni-page")} />
          <NavbarIcon icon={<FiBriefcase />} label="Jobs" onClick={() => navigate("/jobs")} />
          <NavbarIcon icon={<FiMessageCircle />} label="Messaging" onClick={() => navigate("/messaging")} />
          <NavbarIcon icon={<FiBell />} label="Notifications" onClick={() => navigate("/notifications")} />
        </div>
      </div>
    </div>
  );

  const NavbarIcon = ({ icon, label, onClick }) => (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#666",
        cursor: "pointer",
        fontSize: "20px",
        transition: "all 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#0A66C2";
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#666";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {icon}
      <p style={{ fontSize: "12px", margin: "4px 0 0 0", color: "inherit" }}>{label}</p>
    </div>
  );

  // Return clean navbar for profile, jobs, notifications, messaging pages
  if (shouldUseCleanNavbar) {
    return <CleanNavbar />;
  }

  // Original header for other pages
  return (
    <>
      <div className="shadow-md w-full main_container bg-[#F0F8FF]" ref={headerRef}>
        <div className="flex justify-between items-center px-7 md:px-9">
          <div className="flex p-0 m-0 items-center sm:text-lg md:text-2xl">
            <img src={logo} alt="Logo" className="h-[3rem] w-[3rem]" />
            <p>AlumniNexus</p>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center">
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
            <Link to="/login" onClick={handleLinkClick}>
              <button className="bg-black py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] mt-4">
                Login
              </button>
            </Link>
          </ul>
        </div>

        {/* Menu for desktop view */}
        <div className="hidden list-none md:flex justify-between mx-6 my-2 p-4 text-lg">
        </div>
      </div>
    </>
  );
};

export default Header;

//hiiii