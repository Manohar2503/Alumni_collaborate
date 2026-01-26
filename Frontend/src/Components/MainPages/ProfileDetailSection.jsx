import { useState } from "react";
import { FiEdit2, FiMapPin, FiPhone, FiMail, FiCamera } from "react-icons/fi";
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

  const handleSave = async () => {
    try {
      const formData = new FormData();

      Object.entries(editForm).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (profileImageFile) formData.append("profileImage", profileImageFile);
      if (coverImageFile) formData.append("coverImage", coverImageFile);

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

  /* ================================
        ✅ EDIT MODE (Tailwind)
     ================================ */
  if (isEditingProfile) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
            <button
              onClick={() => setIsEditingProfile(false)}
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>

          {/* ✅ Upload Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Cover */}
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Cover Image
              </p>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                <FiCamera />
                <span>Choose cover image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setCoverImageFile(file);
                    setProfile((p) => ({
                      ...p,
                      coverImage: URL.createObjectURL(file),
                    }));
                  }}
                />
              </label>
            </div>

            {/* Profile */}
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Profile Image
              </p>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                <FiCamera />
                <span>Choose profile image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setProfileImageFile(file);
                    setProfile((p) => ({
                      ...p,
                      profileImage: URL.createObjectURL(file),
                    }));
                  }}
                />
              </label>
            </div>
          </div>

          {/* ✅ Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div key={key}>
                <label className="text-sm font-semibold text-gray-900">
                  {label}
                </label>
                <input
                  value={editForm[key]}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${label}`}
                />
              </div>
            ))}

            {/* About full width */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-900">
                About
              </label>
              <textarea
                value={editForm.about}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, about: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write something about yourself..."
              />
            </div>
          </div>

          {/* ✅ Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm"
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsEditingProfile(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================================
        ✅ VIEW MODE (Tailwind)
     ================================ */
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* ✅ Cover */}
      <div
        className="h-[140px] sm:h-[200px] w-full bg-cover bg-center relative"
        style={{
          backgroundImage: profile.coverImage
            ? `url(${profile.coverImage})`
            : "linear-gradient(135deg,#0f172a,#111827,#0f172a)",
        }}
      >
        {/* ✅ Edit button */}
        <button
          onClick={openEdit}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md"
          title="Edit profile"
        >
          <FiEdit2 size={18} />
        </button>

        {/* ✅ Profile Image overlapping */}
        <div className="absolute left-4 sm:left-6 -bottom-10 sm:-bottom-12">
          <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
            <img
              src={profile.profileImage || "https://i.pravatar.cc/120"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ✅ Content */}
      <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6">
        {/* ✅ Top row */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {profile.name || "Your Name"}
            </h2>

            <p className="mt-1 text-sm sm:text-base text-gray-700 font-semibold">
              {profile.headline || "Add your headline (Example: Aspiring SDE)"}
            </p>
          </div>

          <button
            onClick={openEdit}
            className="border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 p-2 rounded-full"
          >
            <FiEdit2 className="text-blue-600" size={18} />
          </button>
        </div>

        {/* ✅ Info Row */}
        <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-gray-500" />
            <span>{profile.location || "Add location"}</span>
          </div>

          {profile.phone && (
            <div className="flex items-center gap-2">
              <FiPhone className="text-gray-500" />
              <span>{profile.phone}</span>
            </div>
          )}

          {profile.email && (
            <div className="flex items-center gap-2">
              <FiMail className="text-gray-500" />
              <span className="truncate">{profile.email}</span>
            </div>
          )}
        </div>

        {/* ✅ Education */}
        {(profile.college || profile.branch || profile.batch) && (
          <div className="mt-5 border-t pt-4">
            <h3 className="text-sm font-bold text-gray-900">Education</h3>
            <p className="text-sm text-gray-700 mt-1 font-semibold">
              {profile.college || ""}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {profile.branch ? profile.branch : ""}
              {profile.branch && profile.batch ? " · " : ""}
              {profile.batch ? `Batch ${profile.batch}` : ""}
            </p>
          </div>
        )}

        {/* ✅ About */}
        <div className="mt-5 border-t pt-4">
          <h3 className="text-sm font-bold text-gray-900">About</h3>
          <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-wrap">
            {profile.about || "Add something about yourself..."}
          </p>
        </div>
      </div>
    </div>
  );
}
