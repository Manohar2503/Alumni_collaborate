import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";

export default function AchievementsSection({
  profile,
  isAchievementsEditMode,
  setIsAchievementsEditMode,
  showAddAch,
  setShowAddAch,
  achText,
  setAchText,
  achMediaFiles,
  achMediaPreviews,
  removeAchMedia,
  handleAchMediaChange,
  editingAchId,
  setEditingAchId,
  editingAchText,
  setEditingAchText,
  updateAchievement,
  deleteAchievement,
  addAchievement,
}) {
  // ✅ detect mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <h2
            style={{
              fontSize: isMobile ? 20 : 24,
              fontWeight: 800,
              margin: 0,
              color: "#1a1a1a",
            }}
          >
            🏆 Achievements
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
            Professional Milestones
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
          {/* Toggle Edit Mode */}
          <button
            onClick={() => setIsAchievementsEditMode(!isAchievementsEditMode)}
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
            <FiPlus color="#0A66C2" size={20} />
          </button>

          {/* Add Achievement */}
          <button
            onClick={() => setShowAddAch(!showAddAch)}
            style={{
              backgroundColor: showAddAch ? "#c0392b" : "#0A66C2",
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
            {showAddAch ? (
              "✕ Cancel"
            ) : (
              <>
                <FiPlus size={18} />
                Add Achievement
              </>
            )}
          </button>
        </div>
      </div>

      {/* Achievements List */}
      <div style={{ marginBottom: 22, width: "100%" }}>
        {(profile.achievements || []).length === 0 ? (
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
            <div style={{ fontSize: 44, marginBottom: 12 }}>🚀</div>
            <p style={{ fontSize: 14, color: "#999", margin: 0 }}>
              No achievements added yet. Start showcasing your milestones!
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 14, width: "100%" }}>
            {(profile.achievements || []).map((ach) => (
              <div
                key={ach.id}
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
                {/* ✅ Editing Mode */}
                {editingAchId === ach.id ? (
                  <div style={{ width: "100%" }}>
                    <textarea
                      value={editingAchText}
                      onChange={(e) => setEditingAchText(e.target.value)}
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 10,
                        minHeight: 90,
                        marginBottom: 12,
                        fontSize: 14,
                        boxSizing: "border-box",
                      }}
                    />

                    <div style={{ display: "flex", gap: 8, width: "100%" }}>
                      <button
                        onClick={() => {
                          updateAchievement(ach.id, editingAchText);
                          setEditingAchId(null);
                          setEditingAchText("");
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
                        onClick={() => {
                          setEditingAchId(null);
                          setEditingAchText("");
                        }}
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
                    {/* ✅ Text */}
                    <div style={{ display: "flex", gap: 12, marginBottom: 12, width: "100%" }}>
                      <span style={{ fontSize: 28 }}>🏆</span>
                      <p
                        style={{
                          fontSize: 15,
                          color: "#333",
                          margin: 0,
                          lineHeight: 1.6,
                          fontWeight: 700,
                          flex: 1,
                        }}
                      >
                        {ach.text}
                      </p>
                    </div>

                    {/* ✅ Media */}
                    {ach.media && ach.media.length > 0 && (
                      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                        {ach.media.map((m, i) => (
                          <div
                            key={i}
                            style={{
                              borderRadius: 10,
                              overflow: "hidden",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                          >
                            {m.type === "image" ? (
                              <img
                                src={m.url}
                                style={{
                                  width: isMobile ? 120 : 140,
                                  height: isMobile ? 90 : 100,
                                  objectFit: "cover",
                                }}
                                alt="achievement"
                              />
                            ) : (
                              <video
                                src={m.url}
                                style={{
                                  width: isMobile ? 120 : 140,
                                  height: isMobile ? 90 : 100,
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ✅ Edit/Delete Buttons */}
                    {isAchievementsEditMode && (
                      <div style={{ display: "flex", gap: 8, width: "100%" }}>
                        <button
                          onClick={() => {
                            setEditingAchId(ach.id);
                            setEditingAchText(ach.text);
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
                          onClick={() => deleteAchievement(ach.id)}
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

      {/* Add Achievement Form */}
      {showAddAch && (
        <div
          style={{
            padding: isMobile ? 16 : 24,
            backgroundColor: "#f9f9f9",
            borderRadius: 12,
            border: "2px dashed #0A66C2",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h4 style={{ margin: "0 0 16px 0", fontSize: 14, fontWeight: 800, color: "#1a1a1a" }}>
            ➕ Add New Achievement
          </h4>

          <textarea
            value={achText}
            onChange={(e) => setAchText(e.target.value)}
            placeholder="Describe your achievement..."
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

          {/* previews */}
          {achMediaPreviews.length > 0 && (
            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              {achMediaPreviews.map((p, i) => (
                <div key={i} style={{ position: "relative", borderRadius: 10, overflow: "hidden" }}>
                  {achMediaFiles[i]?.type?.startsWith("image") ? (
                    <img src={p} style={{ width: 120, height: 90, objectFit: "cover" }} alt="preview" />
                  ) : (
                    <video src={p} style={{ width: 120, height: 90, objectFit: "cover" }} />
                  )}
                  <button
                    onClick={() => removeAchMedia(i)}
                    style={{
                      position: "absolute",
                      right: 6,
                      top: 6,
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      border: "none",
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      cursor: "pointer",
                      fontWeight: 900,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: 12,
              border: "2px dashed #0A66C2",
              borderRadius: 10,
              background: "#f0f8ff",
              cursor: "pointer",
              marginBottom: 12,
              fontWeight: 700,
              color: "#0A66C2",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <input type="file" multiple accept="image/*,video/*" onChange={handleAchMediaChange} style={{ display: "none" }} />
            📸 Add images / videos
          </label>

          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            <button
              onClick={() => {
                addAchievement(achText);
                setAchText("");
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
              onClick={() => {
                setShowAddAch(false);
                setAchText("");
              }}
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
