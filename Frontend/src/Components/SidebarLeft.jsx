import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Layout/Layout";

export default function SidebarLeft() {
  const navigate = useNavigate();
  const { profile } = useContext(UserContext);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="hidden lg:block w-[280px]">
      <div
        onClick={handleProfileClick}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer transition-all hover:shadow-md"
      >
        {/* ✅ Cover (soft neutral) */}
        <div className="h-16 bg-gray-100 relative">
          {/* ✅ Profile Image (overlap) */}
          <div className="absolute left-1/2 -bottom-12 -translate-x-1/2">
            <img
              src={profile?.profileImage || "https://i.pravatar.cc/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-sm"
            />
          </div>
        </div>

        {/* ✅ Content */}
        <div className="pt-16 px-4 pb-4 text-center">
          <h2 className="text-[15px] font-bold text-gray-900 leading-tight">
            {profile?.name || "Your Name"}
          </h2>

          <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">
            {profile?.headline || "Full Stack Developer | MERN | DSA"}
          </p>

          {/* ✅ Divider */}
          <div className="my-3 border-t border-gray-200" />

          {/* ✅ Minimal button (not bright) */}
          <button
            className="w-full text-sm font-semibold py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/profile");
            }}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
