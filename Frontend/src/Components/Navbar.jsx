import {
  FiHome,
  FiBell,
  FiMessageCircle,
  FiBriefcase,
  FiSearch,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import SidebarRight from "./SidebarRight";
import axios from "axios";
import { UserContext } from "../Layout/Layout"; // ✅ make sure path is correct

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { dispatch } = useContext(UserContext); // ✅ IMPORTANT

  const [isMobile, setIsMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setOpenMenu(false);
  };

  // ✅ CORRECT LOGOUT HANDLER
  const handleLogout = async () => {
    const ok = window.confirm("Are you sure you want to logout?");
    if (!ok) return;

    try {
      // ✅ logout API (cookie clear)
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
    } catch (e) {
      console.log("Logout error:", e);
    } finally {
      // ✅ clear frontend user (THIS FIXES YOUR ISSUE)
      dispatch({ type: "USER", payload: null });

      // ✅ optional clears
      try {
        sessionStorage.clear();
        localStorage.clear();
      } catch (e) {}

      setOpenMenu(false);

      // ✅ go HOME so Header shows
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems = [
    { icon: <FiHome />, text: "Home", path: "/alumni-page" },
    { icon: <FiBriefcase />, text: "Jobs", path: "/jobs" },
    { icon: <FiMessageCircle />, text: "Messaging", path: "/messaging" },
    { icon: <FiBell />, text: "Notifications", path: "/notifications" },
    { icon: <FaUserCircle />, text: "Profile", path: "/profile" },
  ];

  const visibleNavItems = navItems.filter(
    (item) => item.path === "/alumni-page" || item.path !== location.pathname
  );

  return (
    <>
      {/* ✅ DESKTOP NAVBAR */}
      {!isMobile && (
        <div
          style={{
            width: "100%",
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              gap: "20px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                color: "#0A66C2",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/alumni-page")}
            >
              <FaGraduationCap />
              Alumni
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: "24px",
                padding: "8px 16px",
                flex: 1,
                maxWidth: "300px",
              }}
            >
              <FiSearch style={{ color: "#999", marginRight: "8px" }} />
              <input
                type="text"
                placeholder="Search alumni, posts..."
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "32px" }}>
              {visibleNavItems.map((item) => (
                <NavIcon
                  key={item.path}
                  icon={item.icon}
                  text={item.text}
                  onClick={() => handleNavigation(item.path)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ MOBILE TOP BAR */}
      {isMobile && (
        <div
          style={{
            width: "100%",
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                color: "#0A66C2",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaGraduationCap />
              VVIT Alumni
            </div>

            <button
              onClick={() => setOpenMenu(true)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "26px",
                cursor: "pointer",
                color: "#333",
              }}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      )}

      {/* ✅ MOBILE RIGHT SIDEBAR DRAWER */}
      {isMobile && openMenu && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
            onClick={() => setOpenMenu(false)}
          />

          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "80%",
              maxWidth: "320px",
              backgroundColor: "white",
              boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "18px" }}>Menu</h3>

              <button
                onClick={() => setOpenMenu(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "26px",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                <FiX />
              </button>
            </div>

            <div style={{ flex: 1 }}>
              <SidebarRight isMobile={true} onClose={() => setOpenMenu(false)} />
            </div>

            {/* ✅ LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              style={{
                marginTop: 16,
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                color: "#c0392b",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ✅ MOBILE BOTTOM NAVBAR */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "white",
            borderTop: "1px solid #ddd",
            zIndex: 60,
            display: "flex",
            justifyContent: "space-around",
            padding: "8px 0",
          }}
        >
          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                color: location.pathname === item.path ? "#0A66C2" : "#666",
                fontSize: "20px",
              }}
            >
              {item.icon}
              <p style={{ fontSize: "11px", margin: "4px 0 0 0" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function NavIcon({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#666",
        cursor: "pointer",
        fontSize: "20px",
        transition: "all 0.3s ease",
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
      <p style={{ fontSize: "12px", margin: "4px 0 0 0", color: "inherit" }}>
        {text}
      </p>
    </div>
  );
}
