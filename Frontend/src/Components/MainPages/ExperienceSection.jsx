import { FiEdit2, FiPlus, FiX } from "react-icons/fi";

export default function ExperienceSection({ experience, onAdd, onUpdate, onDelete }) {
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [form, setForm] = React.useState({ jobTitle: '', company: '', startDate: '', endDate: '', description: '', current: false });

  return (
    <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", marginBottom: "20px", border: "1px solid #e5e5e5" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#1a1a1a" }}>💼 Experience</h2>
          <p style={{ fontSize: "13px", color: "#999", marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Professional Journey</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={() => setIsEditMode(!isEditMode)} style={{ padding: '8px 12px', borderRadius: '50%', background: 'white', border: 'none', width: 44, height: 44, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><FiEdit2 color="#0A66C2" size={20} /></button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              backgroundColor: isAdding ? "#c0392b" : "#0A66C2",
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
            {isAdding ? '✕ Cancel' : <><FiPlus size={18} />Add Experience</>}
          </button>
        </div>
      </div>

      {/* Experience List */}
      <div style={{ marginBottom: "28px" }}>
        {(experience || []).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
            <p style={{ fontSize: 14, color: '#999', margin: 0 }}>No experience added yet. Start building your professional profile!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {(experience || []).map((exp) => (
              <div
                key={exp.id}
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "20px",
                  transition: 'all 0.3s'
                }}
              >
                {editingId === exp.id ? (
                  <div>
                    <input
                      value={form.jobTitle}
                      onChange={(e) => setForm(f => ({ ...f, jobTitle: e.target.value }))}
                      placeholder="Job Title"
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        marginBottom: 12,
                        fontSize: 14,
                        fontFamily: 'inherit'
                      }}
                    />
                    <input
                      value={form.company}
                      onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
                      placeholder="Company"
                      style={{
                        width: "100%",
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        marginBottom: 12,
                        fontSize: 14,
                        fontFamily: 'inherit'
                      }}
                    />
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="Description"
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
                          onUpdate(exp.id, form);
                          setEditingId(null);
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
                        onClick={() => setEditingId(null)}
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
                    {/* Job Title and Company */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: 28 }}>💼</span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px 0", color: "#1a1a1a" }}>{exp.jobTitle}</h3>
                        <p style={{ fontSize: "14px", color: "#0A66C2", margin: "0 0 4px 0", fontWeight: 600 }}>{exp.company}</p>
                        <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
                          {exp.startDate} {exp.endDate && `- ${exp.current ? "Present" : exp.endDate}`}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p style={{ fontSize: "14px", color: "#666", margin: "12px 0 0 40px", lineHeight: "1.6" }}>{exp.description}</p>
                    )}

                    {/* Edit/Delete Actions */}
                    {isEditMode && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button
                          onClick={() => {
                            setEditingId(exp.id);
                            setForm({
                              jobTitle: exp.jobTitle,
                              company: exp.company,
                              startDate: exp.startDate,
                              endDate: exp.endDate,
                              description: exp.description,
                              current: exp.current
                            });
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
                          onClick={() => onDelete(exp.id)}
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

      {/* Add Experience Form */}
      {isAdding && (
        <div style={{ padding: "24px", backgroundColor: "#f9f9f9", borderRadius: "12px", border: "2px dashed #0A66C2" }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>➕ Add New Experience</h4>
          <input
            value={form.jobTitle}
            onChange={(e) => setForm(f => ({ ...f, jobTitle: e.target.value }))}
            type="text"
            placeholder="Job Title"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "12px",
              fontSize: "14px",
              fontFamily: 'inherit'
            }}
          />
          <input
            value={form.company}
            onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
            type="text"
            placeholder="Company"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "12px",
              fontSize: "14px",
              fontFamily: 'inherit'
            }}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Describe your role and achievements..."
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
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => {
                onAdd(form);
                setIsAdding(false);
                setForm({ jobTitle: '', company: '', startDate: '', endDate: '', description: '', current: false });
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
              Save Experience
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setForm({ jobTitle: '', company: '', startDate: '', endDate: '', description: '', current: false });
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
