import {
  FiThumbsUp,
  FiMessageCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API_URL;
const CONTENT_LIMIT = 220;

/* ================= IDENTITY BADGE ================= */
function IdentityBadge({ role }) {
  if (role === "alumni") {
    return (
      <span className="ml-2 text-red-600 font-bold" title="Alumni">
        ★
      </span>
    );
  }

  if (role === "student") {
    return (
      <span className="ml-2 text-blue-600 font-bold" title="Student">
        ★
      </span>
    );
  }

  return null;
}
/* ================================================= */

export default function Post({ data }) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [likes, setLikes] = useState(data.likes || 0);
  const [liked, setLiked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const hasMedia = data.media?.length > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      {/* HEADER */}
      <div className="flex gap-3 p-4 pb-2">
        <img
          src="https://i.pravatar.cc/48"
          className="w-12 h-12 rounded-full"
          alt=""
        />

        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 flex items-center">
            {data.name}
            <IdentityBadge role={data.role} />
          </p>

          <p className="text-xs text-gray-500">
            {data.role === "student" ? "Student" : "Alumni"} • Alumni Nexus
          </p>

          <p className="text-xs text-gray-400">
            {new Date(data.time).toLocaleString()}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-800">
          {data.content.length > CONTENT_LIMIT ? (
            <>
              {showFullContent
                ? data.content
                : data.content.slice(0, CONTENT_LIMIT)}
              {!showFullContent && "... "}
              <span
                onClick={() => setShowFullContent(true)}
                className="text-blue-600 cursor-pointer"
              >
                See more
              </span>
            </>
          ) : (
            data.content
          )}
        </p>
      </div>

      {/* MEDIA */}
      {hasMedia && (
        <div className="relative bg-black">
          {data.media[mediaIndex].type === "image" ? (
            <img
              src={data.media[mediaIndex].url}
              className="w-full max-h-[420px] object-contain"
              alt=""
            />
          ) : (
            <video
              src={data.media[mediaIndex].url}
              controls
              className="w-full max-h-[420px]"
            />
          )}

          {data.media.length > 1 && (
            <>
              <button
                onClick={() =>
                  setMediaIndex(
                    (mediaIndex - 1 + data.media.length) %
                      data.media.length
                  )
                }
                className="absolute left-2 top-1/2 bg-white/80 p-2 rounded-full"
              >
                <FiChevronLeft />
              </button>

              <button
                onClick={() =>
                  setMediaIndex((mediaIndex + 1) % data.media.length)
                }
                className="absolute right-2 top-1/2 bg-white/80 p-2 rounded-full"
              >
                <FiChevronRight />
              </button>
            </>
          )}
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex justify-around py-2 text-sm text-gray-600">
        <button
          onClick={() => {
            setLikes(likes + 1);
            setLiked(true);
          }}
          className={`flex items-center gap-2 ${
            liked ? "text-blue-600 font-medium" : ""
          }`}
        >
          <FiThumbsUp /> Like
        </button>

        <button className="flex items-center gap-2">
          <FiMessageCircle /> Comment
        </button>
      </div>
    </div>
  );
}
