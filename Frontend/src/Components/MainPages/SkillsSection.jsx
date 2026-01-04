import React, { useState } from "react";
import { FiEdit2, FiPlus, FiX } from "react-icons/fi";

export default function SkillsSection({ skills, onAddSkill, onRemoveSkill, onUpdateSkill, isAddingSkill, setIsAddingSkill, newSkill, setNewSkill, skillType, setSkillType }) {
  const [editing, setEditing] = useState({ type: null, index: null });
  const [editValue, setEditValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", marginBottom: "20px", border: "1px solid #e5e5e5" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#1a1a1a" }}>💡 Skills</h2>
          <p style={{ fontSize: "13px", color: "#999", marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Professional Expertise</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={() => setIsEditMode(!isEditMode)} style={{ padding: '8px 12px', borderRadius: '50%', background: 'white', border: 'none', width: 44, height: 44, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><FiEdit2 color="#0A66C2" size={20} /></button>
          <button onClick={() => setIsAddingSkill(!isAddingSkill)} style={{ backgroundColor: "#0A66C2", border: "none", color: "white", borderRadius: "8px", padding: "10px 16px", cursor: "pointer", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", transition: 'all 0.2s' }}><FiPlus size={18} />Add Skill</button>
        </div>
      </div>

      {/* Soft Skills Section */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 4, height: 20, background: '#0A66C2', borderRadius: 2 }}></div>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>Soft Skills</h3>
          <span style={{ fontSize: 12, background: '#f0f0f0', color: '#666', padding: '2px 8px', borderRadius: 12 }}>{skills.soft.length}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {skills.soft.length === 0 ? (
            <p style={{ color: '#999', fontSize: 13 }}>No soft skills added yet</p>
          ) : (
            skills.soft.map((skill, index) => (
              <div key={index} style={{ backgroundColor: "#f0f8ff", border: "1px solid #0A66C2", padding: "10px 16px", borderRadius: "20px", fontSize: "14px", color: "#0A66C2", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", transition: 'all 0.2s' }}>
                {editing.type === 'soft' && editing.index === index ? (
                  <>
                    <input value={editValue} onChange={(e) => setEditValue(e.target.value)} style={{ border: 'none', background: 'transparent', color: '#0A66C2', outline: 'none', fontWeight: 600 }} />
                    <button onClick={() => { onUpdateSkill('soft', index, editValue); setEditing({ type: null, index: null }); }} style={{ background: 'transparent', border: 'none', color: '#0A66C2', cursor: 'pointer', fontWeight: 700 }}>✓</button>
                    <button onClick={() => setEditing({ type: null, index: null })} style={{ background: 'transparent', border: 'none', color: '#999', cursor: 'pointer' }}>✕</button>
                  </>
                ) : (
                  <>
                    <span>•</span>
                    {skill}
                    {isEditMode && (
                      <>
                        <button onClick={() => { setEditing({ type: 'soft', index }); setEditValue(skill); }} style={{ backgroundColor: "transparent", border: "none", color: "#0A66C2", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", padding: "0", marginLeft: "4px", opacity: 0.6 }}><FiEdit2 size={14} /></button>
                        <button onClick={() => onRemoveSkill('soft', index)} style={{ backgroundColor: "transparent", border: "none", color: "#c0392b", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", padding: "0", opacity: 0.6 }}><FiX size={14} /></button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Technical Skills Section */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 4, height: 20, background: '#0A66C2', borderRadius: 2 }}></div>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>Technical Skills</h3>
          <span style={{ fontSize: 12, background: '#f0f0f0', color: '#666', padding: '2px 8px', borderRadius: 12 }}>{skills.technical.length}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {skills.technical.length === 0 ? (
            <p style={{ color: '#999', fontSize: 13 }}>No technical skills added yet</p>
          ) : (
            skills.technical.map((skill, index) => (
              <div key={index} style={{ backgroundColor: "#f0f8ff", border: "1px solid #0A66C2", padding: "10px 16px", borderRadius: "20px", fontSize: "14px", color: "#0A66C2", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", transition: 'all 0.2s' }}>
                {editing.type === 'technical' && editing.index === index ? (
                  <>
                    <input value={editValue} onChange={(e) => setEditValue(e.target.value)} style={{ border: 'none', background: 'transparent', color: '#0A66C2', outline: 'none', fontWeight: 600 }} />
                    <button onClick={() => { onUpdateSkill('technical', index, editValue); setEditing({ type: null, index: null }); }} style={{ background: 'transparent', border: 'none', color: '#0A66C2', cursor: 'pointer', fontWeight: 700 }}>✓</button>
                    <button onClick={() => setEditing({ type: null, index: null })} style={{ background: 'transparent', border: 'none', color: '#999', cursor: 'pointer' }}>✕</button>
                  </>
                ) : (
                  <>
                    <span>•</span>
                    {skill}
                    {isEditMode && (
                      <>
                        <button onClick={() => { setEditing({ type: 'technical', index }); setEditValue(skill); }} style={{ backgroundColor: "transparent", border: "none", color: "#0A66C2", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", padding: "0", marginLeft: "4px", opacity: 0.6 }}><FiEdit2 size={14} /></button>
                        <button onClick={() => onRemoveSkill('technical', index)} style={{ backgroundColor: "transparent", border: "none", color: "#c0392b", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", padding: "0", opacity: 0.6 }}><FiX size={14} /></button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Skill Form */}
      {isAddingSkill && (
        <div style={{ padding: "24px", backgroundColor: "#f9f9f9", borderRadius: "12px", marginTop: "24px", border: "2px dashed #0A66C2" }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>➕ Add New Skill</h4>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#333", display: "block", marginBottom: "8px", textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skill Category</label>
            <select value={skillType} onChange={(e) => setSkillType(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", outline: "none", fontWeight: 600 }}>
              <option value="technical">Technical Skills</option>
              <option value="soft">Soft Skills</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <input type="text" placeholder="e.g., React, JavaScript, Leadership..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyPress={(e) => e.key === "Enter" && onAddSkill(skillType, newSkill)} style={{ flex: 1, padding: "10px 12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", outline: "none" }} />
            <button onClick={() => { onAddSkill(skillType, newSkill); setNewSkill(''); setIsAddingSkill(false); }} style={{ backgroundColor: "#0A66C2", color: "white", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "700" }}>Add</button>
            <button onClick={() => { setIsAddingSkill(false); setNewSkill(""); }} style={{ backgroundColor: "#f0f0f0", color: "#333", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: 700 }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
