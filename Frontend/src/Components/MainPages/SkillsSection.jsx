import React, { useState } from "react";
import { FiEdit2, FiPlus, FiX } from "react-icons/fi";

export default function SkillsSection({
  skills,
  onAddSkill,
  onRemoveSkill,
  onUpdateSkill,
  isAddingSkill,
  setIsAddingSkill,
  newSkill,
  setNewSkill,
  skillType,
  setSkillType,
}) {
  const [editing, setEditing] = useState({ type: null, index: null });
  const [editValue, setEditValue] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const softSkills = skills?.soft || [];
  const technicalSkills = skills?.technical || [];

  const SkillPill = ({ type, skill, index }) => {
    const isThisEditing = editing.type === type && editing.index === index;

    return (
      <div className="flex items-center gap-2 rounded-full border border-[#0A66C2]/30 bg-[#0A66C2]/5 px-3 py-1 text-[12px] sm:text-[13px] font-semibold text-[#0A66C2]">
        {!isThisEditing ? (
          <>
            <span className="text-[10px] sm:text-[11px]">•</span>
            <span className="truncate max-w-[160px] sm:max-w-[220px]">
              {skill}
            </span>

            {isEditMode && (
              <div className="flex items-center gap-2 ml-1">
                <button
                  onClick={() => {
                    setEditing({ type, index });
                    setEditValue(skill);
                  }}
                  className="opacity-70 hover:opacity-100 transition"
                  title="Edit"
                >
                  <FiEdit2 size={14} />
                </button>

                <button
                  onClick={() => onRemoveSkill(type, index)}
                  className="text-red-500 opacity-80 hover:opacity-100 transition"
                  title="Delete"
                >
                  <FiX size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="bg-transparent outline-none text-[#0A66C2] text-[12px] sm:text-[13px] font-semibold w-[120px] sm:w-[160px]"
              autoFocus
            />

            <button
              onClick={() => {
                if (!editValue.trim()) return;
                onUpdateSkill(type, index, editValue.trim());
                setEditing({ type: null, index: null });
              }}
              className="text-green-600 font-bold"
              title="Save"
            >
              ✓
            </button>

            <button
              onClick={() => setEditing({ type: null, index: null })}
              className="text-gray-400 font-bold"
              title="Cancel"
            >
              ✕
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4">
      {/* ✅ Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="text-[16px] sm:text-[18px] font-extrabold text-gray-900">
            💡 Skills
          </h2>
          <p className="text-[11px] sm:text-[12px] text-gray-500 uppercase tracking-wide font-semibold mt-1">
            Professional Expertise
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Edit Mode */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${
              isEditMode
                ? "border-[#0A66C2] text-[#0A66C2] bg-[#0A66C2]/10"
                : "border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
            title="Edit Skills"
          >
            <FiEdit2 size={16} />
          </button>

          {/* Add Skill */}
          <button
            onClick={() => setIsAddingSkill(!isAddingSkill)}
            className="flex items-center gap-2 bg-[#0A66C2] hover:bg-blue-700 text-white text-[12px] sm:text-[13px] font-bold px-3 sm:px-4 py-2 rounded-lg transition"
          >
            <FiPlus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* ✅ Soft Skills */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-[#0A66C2] rounded-full" />
          <h3 className="text-[13px] sm:text-[14px] font-bold text-gray-900">
            Soft Skills
          </h3>
          <span className="text-[11px] bg-gray-100 text-gray-700 px-2 py-[2px] rounded-full font-semibold">
            {softSkills.length}
          </span>
        </div>

        {softSkills.length === 0 ? (
          <p className="text-[12px] text-gray-500">No soft skills added yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <SkillPill
                key={`soft-${index}`}
                type="soft"
                skill={skill}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ Technical Skills */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-[#0A66C2] rounded-full" />
          <h3 className="text-[13px] sm:text-[14px] font-bold text-gray-900">
            Technical Skills
          </h3>
          <span className="text-[11px] bg-gray-100 text-gray-700 px-2 py-[2px] rounded-full font-semibold">
            {technicalSkills.length}
          </span>
        </div>

        {technicalSkills.length === 0 ? (
          <p className="text-[12px] text-gray-500">
            No technical skills added yet
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {technicalSkills.map((skill, index) => (
              <SkillPill
                key={`tech-${index}`}
                type="technical"
                skill={skill}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ Add Skill Form */}
      {isAddingSkill && (
        <div className="mt-6 rounded-xl border border-dashed border-[#0A66C2] bg-[#0A66C2]/5 p-4">
          <h4 className="text-[13px] font-bold text-gray-900 mb-3">
            ➕ Add New Skill
          </h4>

          {/* Category */}
          <div className="mb-3">
            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
              Skill Category
            </label>
            <select
              value={skillType}
              onChange={(e) => setSkillType(e.target.value)}
              className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-semibold outline-none focus:ring-2 focus:ring-[#0A66C2]/30"
            >
              <option value="technical">Technical Skills</option>
              <option value="soft">Soft Skills</option>
            </select>
          </div>

          {/* Input + Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="e.g., React, Java, Leadership..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newSkill.trim()) {
                  onAddSkill(skillType, newSkill.trim());
                  setNewSkill("");
                  setIsAddingSkill(false);
                }
              }}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:ring-2 focus:ring-[#0A66C2]/30"
            />

            <button
              onClick={() => {
                if (!newSkill.trim()) return;
                onAddSkill(skillType, newSkill.trim());
                setNewSkill("");
                setIsAddingSkill(false);
              }}
              className="bg-[#0A66C2] hover:bg-blue-700 text-white font-bold text-[13px] px-4 py-2 rounded-lg transition"
            >
              Add
            </button>

            <button
              onClick={() => {
                setIsAddingSkill(false);
                setNewSkill("");
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-[13px] px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
