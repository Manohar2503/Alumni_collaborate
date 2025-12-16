import { useNavigate } from "react-router-dom";

export default function SidebarLeft() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div
      onClick={handleProfileClick}
      style={{
        width: "25%",
        backgroundColor: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        padding: "16px",
        height: "fit-content",
        cursor: "pointer",
        transition: "all 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src="https://i.pravatar.cc/100"
          style={{ borderRadius: "50%", width: "80px", height: "80px", border: "2px solid #0A66C2" }}
          alt="Profile"
        />
        <h2 style={{ marginTop: "12px", fontWeight: "600", fontSize: "18px", margin: "12px 0 0 0", cursor: "pointer", color: "#0A66C2" }}>
          Varsha Garapati
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "center", margin: "8px 0" }}>
          Attended Vasireddy Venkatadri Institute of Technology
        </p>
      </div>

      <div style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "12px" }}>
        <p style={{ fontSize: "14px", color: "#666", margin: "0" }}>
          Followers: <b>53</b>
        </p>
      </div>
    </div>
  );
}
