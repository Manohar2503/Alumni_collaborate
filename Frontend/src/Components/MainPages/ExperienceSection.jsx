import { useState, useEffect } from "react";
import { FiEdit2, FiPlus } from "react-icons/fi";

export default function ExperienceSection({ experience, onAdd, onUpdate, onDelete }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [form, setForm] = useState({
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        padding: isMobile ? 16 : 32,
        marginBottom: 20,
        border: "1px solid #e5e5e5",

        // ✅ FULL WIDTH FIX
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 12 : 0,
          marginBottom: 22,
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, margin: 0, color: "#1a1a1a" }}>
            💼 Experience
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#999",
              marginTop: 8,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontWeight: 600,
            }}
          >
            Professional Journey
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "space-between" : "flex-end",
          }}
        >
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            style={{
              borderRadius: "50%",
              background: "white",
              border: "none",
              width: 44,
              height: 44,
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FiEdit2 color="#0A66C2" size={20} />
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              backgroundColor: isAdding ? "#c0392b" : "#0A66C2",
              border: "none",
              color: "white",
              borderRadius: 10,
              padding: "10px 14px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: isMobile ? "calc(100% - 54px)" : "auto",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            {isAdding ? (
              "✕ Cancel"
            ) : (
              <>
                <FiPlus size={18} />
                Add Experience
              </>
            )}
          </button>
        </div>
      </div>

      {/* Experience List */}
      <div style={{ marginBottom: 22, width: "100%" }}>
        {(experience || []).length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "34px 16px",
              backgroundColor: "#f9f9f9",
              borderRadius: 12,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
            <p style={{ fontSize: 14, color: "#999", margin: 0 }}>
              No experience added yet. Start building your professional profile!
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 14, width: "100%" }}>
            {(experience || []).map((exp) => (
              <div
                key={exp.id}
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #e0e0e0",
                  borderRadius: 12,
                  padding: isMobile ? 16 : 20,

                  // ✅ FULL WIDTH FIX
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                {editingId === exp.id ? (
                  <div style={{ width: "100%" }}>
                    <input
                      value={form.jobTitle}
                      onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
                      placeholder="Job Title"
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        marginBottom: 12,
                        fontSize: 14,
                        boxSizing: "border-box",
                      }}
                    />

                    <input
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      placeholder="Company"
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        marginBottom: 12,
                        fontSize: 14,
                        boxSizing: "border-box",
                      }}
                    />

                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Description"
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        minHeight: 80,
                        marginBottom: 12,
                        fontSize: 14,
                        boxSizing: "border-box",
                      }}
                    />

                    <div style={{ display: "flex", gap: 8, width: "100%" }}>
                      <button
                        onClick={() => {
                          onUpdate(exp.id, form);
                          setEditingId(null);
                        }}
                        style={{
                          flex: 1,
                          padding: "12px 16px",
                          background: "#0A66C2",
                          color: "white",
                          border: "none",
                          borderRadius: 10,
                          cursor: "pointer",
                          fontWeight: 800,
                        }}
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          flex: 1,
                          padding: "12px 16px",
                          background: "#f0f0f0",
                          border: "none",
                          borderRadius: 10,
                          cursor: "pointer",
                          fontWeight: 800,
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: 12, marginBottom: 8, width: "100%" }}>
                      <span style={{ fontSize: 28 }}>💼</span>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            fontSize: 16,
                            fontWeight: 800,
                            margin: "0 0 4px 0",
                            color: "#1a1a1a",
                          }}
                        >
                          {exp.jobTitle}
                        </h3>

                        <p style={{ fontSize: 14, color: "#0A66C2", margin: "0 0 4px 0", fontWeight: 700 }}>
                          {exp.company}
                        </p>

                        <p style={{ fontSize: 13, color: "#999", margin: 0 }}>
                          {exp.startDate} {exp.endDate && `- ${exp.current ? "Present" : exp.endDate}`}
                        </p>
                      </div>
                    </div>

                    {exp.description && (
                      <p
                        style={{
                          fontSize: 14,
                          color: "#666",
                          margin: "12px 0 0 0",
                          lineHeight: 1.6,
                        }}
                      >
                        {exp.description}
                      </p>
                    )}

                    {isEditMode && (
                      <div style={{ display: "flex", gap: 8, marginTop: 12, width: "100%" }}>
                        <button
                          onClick={() => {
                            setEditingId(exp.id);
                            setForm({
                              jobTitle: exp.jobTitle,
                              company: exp.company,
                              startDate: exp.startDate,
                              endDate: exp.endDate,
                              description: exp.description,
                              current: exp.current,
                            });
                          }}
                          style={{
                            flex: 1,
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: "1px solid #0A66C2",
                            background: "transparent",
                            color: "#0A66C2",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 800,
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(exp.id)}
                          style={{
                            flex: 1,
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: "1px solid #c0392b",
                            background: "transparent",
                            color: "#c0392b",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 800,
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Experience Form */}
      {isAdding && (
        <div
          style={{
            padding: isMobile ? 16 : 24,
            backgroundColor: "#f9f9f9",
            borderRadius: 12,
            border: "2px dashed #0A66C2",

            // ✅ FULL WIDTH FIX
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h4 style={{ margin: "0 0 16px 0", fontSize: 14, fontWeight: 800, color: "#1a1a1a" }}>
            ➕ Add New Experience
          </h4>

          <input
            value={form.jobTitle}
            onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
            type="text"
            placeholder="Job Title"
            style={{
              width: "100%",
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 10,
              marginBottom: 12,
              fontSize: 14,
              boxSizing: "border-box",
            }}
          />

          <input
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            type="text"
            placeholder="Company"
            style={{
              width: "100%",
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 10,
              marginBottom: 12,
              fontSize: 14,
              boxSizing: "border-box",
            }}
          />

          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Describe your role and achievements..."
            style={{
              width: "100%",
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 10,
              marginBottom: 12,
              fontSize: 14,
              minHeight: 100,
              boxSizing: "border-box",
            }}
          />

          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            <button
              onClick={() => {
                onAdd(form);
                setIsAdding(false);
                setForm({
                  jobTitle: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  current: false,
                });
              }}
              style={{
                flex: 1,
                backgroundColor: "#0A66C2",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              Save
            </button>

            <button
              onClick={() => setIsAdding(false)}
              style={{
                flex: 1,
                backgroundColor: "#f0f0f0",
                color: "#333",
                border: "none",
                borderRadius: 10,
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
