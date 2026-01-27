import { useNavigate } from "react-router-dom";
import EventsData from "../assets/data/EventsData";
import { useEffect, useState } from "react";

export default function SidebarRight({ isMobile = false, onClose }) {
  const [randomEvents, setRandomEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // shuffle events and pick 4
    const shuffled = [...EventsData].sort(() => 0.5 - Math.random()).slice(0, 4);
    setRandomEvents(shuffled);
  }, []);

  // ✅ helper function: navigate + close mobile drawer
  const handleNavigate = (path) => {
    navigate(path);

    // ✅ Close drawer immediately (only in mobile)
    if (onClose) onClose();
  };

  return (
    <div
      style={{
        width: isMobile ? "100%" : "25%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* ✅ Suggested For You Section (ALWAYS SHOW) */}
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          padding: "16px",
          height: "fit-content",
        }}
      >
        <h2 style={{ fontWeight: "600", fontSize: "18px", marginBottom: "12px" }}>
          Suggested For You
        </h2>

        <ul
          style={{
            fontSize: "14px",
            color: "#666",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <li
            style={{
              marginBottom: "12px",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            🎓 Join Alumni Group
          </li>

          <li
            style={{
              marginBottom: "12px",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => handleNavigate("/careerresources")}
          >
            💼 Career Resources
          </li>

          <li
            style={{
              marginBottom: "12px",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => handleNavigate("/mentors")}
          >
            📚 Mentorship Program
          </li>

          <li
            style={{
              marginBottom: "12px",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} onClick={()=>navigate('/alumni-page')}
          >
            🎉 Upcoming Events
          </li>
          <li style={{ marginBottom: "12px", padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease" }} onClick={()=>navigate('/postReview')}>📝 Post a Review</li>
        </ul>
      </div>

      {/* ✅ Events Section (Desktop only, hide in mobile) */}
      {!isMobile && (
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "16px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontWeight: "600", fontSize: "18px", marginBottom: "12px", margin: 0 }}>
            🎯 Upcoming Events
          </h2>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "8px",
              marginTop: "12px",
            }}
          >
            {randomEvents.map((event, index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  marginBottom: "12px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  cursor: "pointer",
                  borderLeft: "4px solid #007AFF",
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9f9f9";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Event Image */}
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      marginBottom: "8px",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}

                <h4 style={{ fontWeight: "600", fontSize: "13px", margin: "0 0 4px 0", color: "#333" }}>
                  {event.title}
                </h4>

                <p style={{ fontSize: "12px", color: "#666", margin: "4px 0" }}>📍 {event.location}</p>
                <p style={{ fontSize: "12px", color: "#666", margin: "4px 0" }}>📅 {event.date}</p>
                <p style={{ fontSize: "12px", color: "#666", margin: "4px 0" }}>🕐 {event.time}</p>

                <p style={{ fontSize: "11px", color: "#999", margin: "6px 0 0 0", fontStyle: "italic" }}>
                  {event.aim}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
