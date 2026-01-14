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
  // 🔥 FILE STATES (CRITICAL FIX)
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const handleSave = async () => {
  try {
    const formData = new FormData();

    // TEXT FIELDS
    Object.entries(editForm).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // ✅ SEND ACTUAL FILES (THIS IS THE FIX)
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    if (coverImageFile) {
      formData.append("coverImage", coverImageFile);
    }

    const updatedProfile = await updateProfile(formData);

    // Sync UI with backend response
    setProfile(updatedProfile);
    setIsEditingProfile(false);

    // cleanup
    setProfileImageFile(null);
    setCoverImageFile(null);

  } catch (err) {
    console.error("Save failed:", err);
    alert("Failed to save profile");
  }
};


  return (
    <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e5e5" }}>
      
      {/* COVER IMAGE */}
      <div
        style={{
          backgroundImage: profile.coverImage
            ? `url(${profile.coverImage})`
            : "linear-gradient(135deg, #667eea 0%, #d946ef 100%)",
          height: isMobile ? 160 : 240,
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={() => {
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
          }}
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

      {/* ================= EDIT MODE ================= */}
      {isEditingProfile ? (
        <div style={{ padding: 32 }}>
          <h3 style={{ marginBottom: 20 }}>Edit Profile</h3>

          {/* COVER IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setCoverImageFile(file);
              setProfile(p => ({ ...p, coverImage: URL.createObjectURL(file) }));
            }}
          />

          {/* PROFILE IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setProfileImageFile(file);
              setProfile(p => ({ ...p, profileImage: URL.createObjectURL(file) }));
            }}
          />

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
              <label style={{ fontSize: 12, fontWeight: 600 }}>{label}</label>
              <input
                value={editForm[key]}
                onChange={(e) => setEditForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
              />
            </div>
          ))}

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600 }}>About</label>
            <textarea
              value={editForm.about}
              onChange={(e) => setEditForm(f => ({ ...f, about: e.target.value }))}
              style={{ width: "100%", minHeight: 100, padding: 10, borderRadius: 6 }}
            />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleSave}
              style={{ background: "#0A66C2", color: "white", padding: "12px 24px", borderRadius: 6, border: "none" }}
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditingProfile(false)}
              style={{ padding: "12px 24px", borderRadius: 6, border: "none" }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* ================= VIEW MODE ================= */
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

              <p><FiMapPin /> {profile.location}</p>
              <p><FiPhone /> {profile.phone}</p>
              <p><FiMail /> {profile.email}</p>

              <div style={{ marginTop: 16 }}>
                <h3>About</h3>
                <p>{profile.about}</p>
              </div>

              <div style={{ marginTop: 16 }}>
                <h3>Education</h3>
                <p>{profile.college}</p>
                <p>{profile.branch} · Batch {profile.batch}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
