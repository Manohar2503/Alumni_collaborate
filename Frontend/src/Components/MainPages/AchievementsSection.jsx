import { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";

export default function AchievementsSection({
  profile,
  setProfile,
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
  addAchievement
}) {
  return (
    <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", marginBottom: "20px", border: "1px solid #e5e5e5" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#1a1a1a" }}>🏆 Achievements</h2>
          <p style={{ fontSize: "13px", color: "#999", marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Professional Milestones</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={() => setIsAchievementsEditMode(!isAchievementsEditMode)} style={{ padding: '8px 12px', borderRadius: '50%', background: 'white', border: 'none', width: 44, height: 44, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><FiPlus color="#0A66C2" size={20} /></button>
          <button
            onClick={() => setShowAddAch(!showAddAch)}
            style={{
              backgroundColor: showAddAch ? "#c0392b" : "#0A66C2",
              border: "none",
              color: "white",
              borderRadius: "8px",
              padding: "10px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: 'all 0.2s'
            }}
          >
            {showAddAch ? '✕ Cancel' : <><FiPlus size={18} />Add Achievement</>}
          </button>
        </div>
      </div>

      {/* Achievements List */}
      <div style={{ marginBottom: "28px" }}>
        {(profile.achievements || []).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
            <p style={{ fontSize: 14, color: '#999', margin: 0 }}>No achievements added yet. Start showcasing your milestones!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {(profile.achievements || []).map((ach) => (
              <div
                key={ach.id}
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "20px",
                  transition: 'all 0.3s'
                }}
              >
                {editingAchId === ach.id ? (
                  <div>
                    <textarea
                      value={editingAchText}
                      onChange={(e) => setEditingAchText(e.target.value)}
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        minHeight: 80,
                        marginBottom: 12,
                        fontSize: 14,
                        fontFamily: 'inherit'
                      }}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => {
                          updateAchievement(ach.id, editingAchText);
                          setEditingAchId(null);
                          setEditingAchText('');
                        }}
                        style={{
                          padding: '10px 16px',
                          background: '#0A66C2',
                          color: 'white',
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontWeight: 700
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingAchId(null);
                          setEditingAchText('');
                        }}
                        style={{
                          padding: '10px 16px',
                          background: '#f0f0f0',
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontWeight: 700
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Achievement Text */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: 28 }}>🏆</span>
                      <p style={{ fontSize: "15px", color: "#333", margin: 0, lineHeight: "1.6", fontWeight: 600, flex: 1 }}>{ach.text}</p>
                    </div>

                    {/* Achievement Media */}
                    {ach.media && ach.media.length > 0 && (
                      <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                        {ach.media.map((m, i) => (
                          <div key={i} style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            {m.type === 'image' ? (
                              <img src={m.url} style={{ width: 140, height: 100, objectFit: 'cover' }} alt="achievement" />
                            ) : (
                              <video src={m.url} style={{ width: 140, height: 100, objectFit: 'cover' }} />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Edit/Delete Actions */}
                    {isAchievementsEditMode && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => {
                            setEditingAchId(ach.id);
                            setEditingAchText(ach.text);
                          }}
                          style={{
                            padding: '8px 12px',
                            borderRadius: 6,
                            border: '1px solid #0A66C2',
                            background: 'transparent',
                            color: '#0A66C2',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAchievement(ach.id)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: 6,
                            border: '1px solid #c0392b',
                            background: 'transparent',
                            color: '#c0392b',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600
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
        <div style={{ padding: "24px", backgroundColor: "#f9f9f9", borderRadius: "12px", border: "2px dashed #0A66C2" }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>➕ Add New Achievement</h4>
          <textarea
            value={achText}
            onChange={(e) => setAchText(e.target.value)}
            placeholder="Describe your achievement..."
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "12px",
              fontSize: "14px",
              minHeight: 100,
              fontFamily: 'inherit'
            }}
          />
          {achMediaPreviews.length > 0 && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
              {achMediaPreviews.map((p, i) => (
                <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                  {achMediaFiles[i].type.startsWith('image') ? (
                    <img src={p} style={{ width: 120, height: 90, objectFit: 'cover' }} alt="preview" />
                  ) : (
                    <video src={p} style={{ width: 120, height: 90, objectFit: 'cover' }} />
                  )}
                  <button onClick={() => removeAchMedia(i)} style={{ position: 'absolute', right: 4, top: 4, background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', width: 24, height: 24, borderRadius: 12, cursor: 'pointer', fontWeight: 700 }}>×</button>
                </div>
              ))}
            </div>
          )}
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, border: '2px dashed #0A66C2', borderRadius: 8, background: '#f0f8ff', cursor: 'pointer', marginBottom: 12, fontWeight: 600, color: '#0A66C2' }}>
            <input type="file" multiple accept="image/*,video/*" onChange={handleAchMediaChange} style={{ display: 'none' }} />
            📸 Add images / videos
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => {
                addAchievement(achText);
                setAchText('');
              }}
              style={{
                flex: 1,
                backgroundColor: "#0A66C2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "700"
              }}
            >
              Save Achievement
            </button>
            <button
              onClick={() => {
                setShowAddAch(false);
                setAchText('');
              }}
              style={{
                flex: 1,
                backgroundColor: "#f0f0f0",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                padding: "12px 16px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700
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
