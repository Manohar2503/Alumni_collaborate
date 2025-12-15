export default function SidebarLeft() {
  return (
    <div style={{ width: "25%", backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderRadius: "12px", padding: "16px", height: "fit-content" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src="https://i.pravatar.cc/100"
          style={{ borderRadius: "50%", width: "80px", height: "80px", border: "2px solid #0A66C2" }}
          alt=""
        />
        <h2 style={{ marginTop: "12px", fontWeight: "600", fontSize: "18px" }}>Varsha Garapati</h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "center" }}>
          Attended Vasireddy Venkatadri Institute of Technology
        </p>
      </div>

      <div style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "12px" }}>
        <p style={{ fontSize: "14px", color: "#666" }}>Profile viewers: <b>53</b></p>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>Post impressions: <b>1</b></p>
      </div>
    </div>
  );
}
