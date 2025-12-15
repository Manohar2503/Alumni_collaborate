import { FiThumbsUp, FiMessageCircle, FiShare2, FiUserPlus } from "react-icons/fi";

export default function Post({ data }) {
  return (
    <div style={{ backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <img
          src="https://i.pravatar.cc/45"
          style={{ borderRadius: "50%" }}
          alt=""
        />
        <div>
          <h3 style={{ fontWeight: "600", margin: 0 }}>{data.name}</h3>
          <p style={{ fontSize: "14px", color: "#999", margin: 0 }}>{data.headline}</p>
          <span style={{ fontSize: "12px", color: "#999" }}>{data.time}</span>
        </div>
      </div>

      <p style={{ marginTop: "12px", color: "#333" }}>{data.content}</p>

      {data.image && (
        <img
          src={data.image}
          alt=""
          style={{ borderRadius: "12px", marginTop: "12px", maxHeight: "320px", objectFit: "cover", width: "100%" }}
        />
      )}

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "16px", color: "#666", borderTop: "1px solid #eee", paddingTop: "12px" }}>
        <PostButton icon={<FiThumbsUp />} text="Like" />
        <PostButton icon={<FiMessageCircle />} text="Comment" />
        <PostButton icon={<FiShare2 />} text="Share" />
        <PostButton icon={<FiUserPlus />} text="Follow" />
      </div>
    </div>
  );
}

function PostButton({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}
