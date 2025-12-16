import { FiHome, FiBell, FiMessageCircle, FiBriefcase, FiSearch } from "react-icons/fi";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ width: "100%", backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", gap: "20px" }}>
        <div style={{ fontSize: "24px", color: "#0A66C2", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => handleNavigation("/alumni-page")}>
          <FaGraduationCap />
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

        <div style={{ display: "flex", gap: "32px" }}>
          <NavIcon icon={<FiHome />} text="Home" onClick={() => handleNavigation("/alumni-page")} />
          <NavIcon icon={<FiBriefcase />} text="Jobs" onClick={() => handleNavigation("/jobs")} />
          <NavIcon icon={<FiMessageCircle />} text="Messaging" onClick={() => handleNavigation("/messaging")} />
          <NavIcon icon={<FiBell />} text="Notifications" onClick={() => handleNavigation("/notifications")} />
          <NavIcon icon={<FaUserCircle />} text="Profile" onClick={() => handleNavigation("/profile")} />
        </div>
      </div>
    </div>
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
      <p style={{ fontSize: "12px", margin: "4px 0 0 0", color: "inherit" }}>{text}</p>
    </div>
  );
}
