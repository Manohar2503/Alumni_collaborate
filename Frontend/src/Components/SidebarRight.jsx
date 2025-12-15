export default function SidebarRight() {
  return (
    <div style={{ width: "25%", backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderRadius: "12px", padding: "16px", height: "fit-content" }}>
      <h2 style={{ fontWeight: "600", fontSize: "18px", marginBottom: "12px" }}>Suggested For You</h2>

      <ul style={{ fontSize: "14px", color: "#666", listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ marginBottom: "12px", padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "8px", cursor: "pointer" }}>🎓 Join Alumni Group</li>
        <li style={{ marginBottom: "12px", padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "8px", cursor: "pointer" }}>💼 Career Resources</li>
        <li style={{ marginBottom: "12px", padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "8px", cursor: "pointer" }}>📚 Mentorship Program</li>
        <li style={{ marginBottom: "12px", padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "8px", cursor: "pointer" }}>🎉 Upcoming Events</li>
      </ul>
    </div>
  );
}
