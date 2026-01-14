import { useState } from "react";
import { FiEdit2, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { updateProfile } from "../../api/profileApi";

export default function ProfileDetailSection({
  profile,
  setProfile,
  isEditingProfile,
  setIsEditingProfile,
  editForm,
  setEditForm,
  isMobile = false,
}) {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const handleSave = async () => {
    try {
      const formData = new FormData();

      Object.entries(editForm).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }
      if (coverImageFile) {
        formData.append("coverImage", coverImageFile);
      }

      const updatedProfile = await updateProfile(formData);

      setProfile(updatedProfile);
      setIsEditingProfile(false);

      setProfileImageFile(null);
      setCoverImageFile(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save profile");
    }
  };

  // ✅ helper for edit open
  const openEdit = () => {
    setEditForm({
      name: profile.name || "",
      headline: profile.headline || "",
      about: profile.about || "",
      location: profile.location || "",
      phone: profile.phone || "",
      email: profile.email || "",
      college: profile.college || "",
      branch: profile.branch || "",
      batch: profile.batch || "",
    });
    setIsEditingProfile(true);
  };

  /* ================================
      ✅ MOBILE LINKEDIN STYLE VIEW
     ================================ */
  if (isMobile && !isEditingProfile) {
    return (
      <div
        style={{
          background: "white",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid #e5e5e5",
        }}
      >
        {/* COVER */}
        <div
          style={{
            height: 140,
            position: "relative",
            backgroundImage: profile.coverImage
              ? `url(${profile.coverImage})`
              : "linear-gradient(135deg, #111827 0%, #0f172a 50%, #111827 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* EDIT COVER BUTTON (TOP RIGHT like LinkedIn) */}
          <button
            onClick={openEdit}
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.55)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}
          >
            <FiEdit2 size={18} />
          </button>

          {/* PROFILE IMAGE (OVERLAP) */}
          <div
            style={{
              position: "absolute",
              left: 16,
              bottom: -38,
              width: 86,
              height: 86,
              borderRadius: "50%",
              border: "4px solid white",
              background: "white",
              overflow: "hidden",
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={profile.profileImage}
              alt="profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "54px 16px 16px 16px" }}>
          {/* NAME ROW */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                color: "#111",
                letterSpacing: "0.2px",
              }}
            >
              {profile.name || "Your Name"}
            </h2>

            {/* ✅ badge mimic */}
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#0A66C2",
                color: "white",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
              }}
            >
              ✓
            </span>

            <span style={{ color: "#6b7280", fontSize: 14, fontWeight: 600 }}>
              He/Him
            </span>

            {/* mini edit icon like LinkedIn (right aligned) */}
            <div style={{ marginLeft: "auto" }}>
              <button
                onClick={openEdit}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1px solid #e5e5e5",
                  background: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiEdit2 color="#0A66C2" size={18} />
              </button>
            </div>
          </div>

          {/* HEADLINE (LinkedIn style multi line) */}
          <p
            style={{
              marginTop: 6,
              marginBottom: 10,
              fontSize: 14,
              color: "#222",
              lineHeight: 1.45,
              fontWeight: 600,
              whiteSpace: "pre-wrap",
            }}
          >
            {profile.headline ||
              "Aspiring SDE | CSE Student | MERN Stack, Java & DSA | Ex-Intern @ AscendSkills"}
          </p>

          {/* COLLEGE + LOCATION */}
          <p
            style={{
              margin: "0 0 6px 0",
              fontSize: 12.5,
              color: "#6b7280",
              lineHeight: 1.4,
              fontWeight: 600,
              whiteSpace: "pre-wrap",
            }}
          >
            {profile.college
              ? `${profile.college}${profile.branch ? ` · ${profile.branch}` : ""}${
                  profile.batch ? ` · ${profile.batch}` : ""
                }`
              : "VVIT College · CSE · 2022-2026"}
          </p>

          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
            }}
          >
            <FiMapPin />
            {profile.location || "Krishna, Andhra Pradesh, India"}
          </p>

          {/* CONTACT CHIPS (small like LinkedIn) */}
          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {profile.phone && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "#f3f4f6",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#111",
                }}
              >
                <FiPhone />
                {profile.phone}
              </div>
            )}

            {profile.email && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "#f3f4f6",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#111",
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <FiMail />
                {profile.email}
              </div>
            )}
          </div>

          {/* ABOUT (LinkedIn section) */}
          {profile.about && (
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>
                About
              </h4>
              <p
                style={{
                  marginTop: 6,
                  marginBottom: 0,
                  fontSize: 13,
                  color: "#374151",
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {profile.about}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ================================
       ✅ EDIT MODE (Same for both)
     ================================ */
  if (isEditingProfile) {
    return (
      <div
        style={{
          background: "white",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e5e5e5",
        }}
      >
        <div style={{ padding: isMobile ? 16 : 32 }}>
          <h3 style={{ marginBottom: 18 }}>Edit Profile</h3>

          {/* COVER IMAGE */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 700 }}>
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ width: "100%", marginTop: 6 }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setCoverImageFile(file);
                setProfile((p) => ({
                  ...p,
                  coverImage: URL.createObjectURL(file),
                }));
              }}
            />
          </div>

          {/* PROFILE IMAGE */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 700 }}>
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ width: "100%", marginTop: 6 }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setProfileImageFile(file);
                setProfile((p) => ({
                  ...p,
                  profileImage: URL.createObjectURL(file),
                }));
              }}
            />
          </div>

          {/* TEXT FIELDS */}
          {[
            ["Name", "name"],
            ["Headline", "headline"],
            ["Location", "location"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["College", "college"],
            ["Branch", "branch"],
            ["Batch", "batch"],
          ].map(([label, key]) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700 }}>{label}</label>
              <input
                value={editForm[key]}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, [key]: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  marginTop: 6,
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 700 }}>About</label>
            <textarea
              value={editForm.about}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, about: e.target.value }))
              }
              style={{
                width: "100%",
                minHeight: 100,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ddd",
                marginTop: 6,
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                background: "#0A66C2",
                color: "white",
                padding: "12px 16px",
                borderRadius: 8,
                border: "none",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditingProfile(false)}
              style={{
                flex: 1,
                background: "#f0f0f0",
                padding: "12px 16px",
                borderRadius: 8,
                border: "none",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================================
        ✅ DESKTOP VIEW (UNCHANGED)
     ================================ */
  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #e5e5e5",
      }}
    >
      {/* COVER IMAGE */}
      <div
        style={{
          backgroundImage: profile.coverImage
            ? `url(${profile.coverImage})`
            : "linear-gradient(135deg, #667eea 0%, #d946ef 100%)",
          height: 240,
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={openEdit}
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            background: "white",
            border: "none",
            width: 44,
            height: 44,
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FiEdit2 color="#0A66C2" size={20} />
        </button>
      </div>

      {/* VIEW MODE */}
      <div style={{ padding: 32 }}>
        <div style={{ display: "flex", gap: 32 }}>
          {/* PROFILE IMAGE */}
          <img
            src={profile.profileImage}
            alt="profile"
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "4px solid #0A66C2",
              objectFit: "cover",
            }}
          />

          {/* INFO */}
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, color: "#0A66C2" }}>{profile.name}</h1>
            <p style={{ fontWeight: 600 }}>{profile.headline}</p>

            <p>
              <FiMapPin /> {profile.location}
            </p>
            <p>
              <FiPhone /> {profile.phone}
            </p>
            <p>
              <FiMail /> {profile.email}
            </p>

            <div style={{ marginTop: 16 }}>
              <h3>About</h3>
              <p>{profile.about}</p>
            </div>

            <div style={{ marginTop: 16 }}>
              <h3>Education</h3>
              <p>{profile.college}</p>
              <p>
                {profile.branch} · Batch {profile.batch}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
