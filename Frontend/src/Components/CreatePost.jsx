import { FaRegImage, FaRegSmile } from "react-icons/fa";

export default function CreatePost() {
  return (
    <div style={{ backgroundColor: "white", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderRadius: "12px", marginBottom: "16px" }}>
      <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
        <img
          src="https://i.pravatar.cc/50"
          alt=""
          style={{ borderRadius: "50%", width: "48px", height: "48px" }}
        />
        <input
          type="text"
          placeholder="Start a post"
          style={{ width: "100%", border: "1px solid #ccc", borderRadius: "24px", padding: "8px 16px", fontSize: "14px" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "12px", color: "#999" }}>
        <Action icon={<FaRegImage />} text="Photo" />
        <Action icon={<FaRegSmile />} text="Feeling" />
      </div>
    </div>
  );
}

function Action({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}
