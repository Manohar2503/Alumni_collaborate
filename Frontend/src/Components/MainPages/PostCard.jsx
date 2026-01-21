import {
  FiThumbsUp,
  FiMessageCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";

const CONTENT_LIMIT = 120;

function IdentityBadge({ role }) {
  if (role === "alumni")
    return <span className="ml-2 text-red-600 font-bold">★</span>;
  if (role === "student")
    return <span className="ml-2 text-blue-600 font-bold">★</span>;
  return null;
}

const linkifyText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    part.match(urlRegex) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-words"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

export default function ProfilePostCard({ post }) {
  const [mediaIndex, setMediaIndex] = useState(0);

  const fullContent = post.content || "";
  const displayedContent =
    fullContent.length > CONTENT_LIMIT
      ? fullContent.slice(0, CONTENT_LIMIT) + "..."
      : fullContent;

  const hasMedia = post.media?.length > 0;
  const author = post.author || {};

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden">
      {/* ✅ Header */}
      <div className="flex gap-3 p-4 pb-2">
        <img
          src={author.profileImage || "https://i.pravatar.cc/45"}
          alt={author.name || "User"}
          className="rounded-full w-10 h-10 object-cover"
        />

        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 flex items-center">
            {author.name || "User"}
            <IdentityBadge role={author.role} />
          </p>

          {author.headline && (
            <p className="text-xs text-gray-500 line-clamp-1">
              {author.headline}
            </p>
          )}

          <p className="text-[11px] text-gray-400 mt-0.5">
            {post.time ? new Date(post.time).toLocaleString() : ""}
          </p>
        </div>
      </div>

      {/* ✅ Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {linkifyText(displayedContent)}
          </p>
        </div>
      )}

      {/* ✅ Media (smaller height) */}
      {hasMedia && (
        <div className="relative bg-black">
          {post.media[mediaIndex]?.type === "image" ? (
            <img
              src={post.media[mediaIndex]?.url}
              className="w-full h-[180px] sm:h-[200px] object-cover"
              alt="post"
            />
          ) : (
            <video
              src={post.media[mediaIndex]?.url}
              controls
              className="w-full h-[180px] sm:h-[200px]"
            />
          )}

          {/* ✅ Media arrows only if multiple */}
          {post.media.length > 1 && (
            <>
              <button
                onClick={() =>
                  setMediaIndex((prev) =>
                    prev === 0 ? post.media.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow"
              >
                <FiChevronLeft />
              </button>

              <button
                onClick={() =>
                  setMediaIndex((prev) =>
                    prev === post.media.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow"
              >
                <FiChevronRight />
              </button>
            </>
          )}
        </div>
      )}

      {/* ✅ Footer actions */}
      <div className="flex justify-around py-2 text-sm text-gray-600 border-t">
        <button className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100">
          <FiThumbsUp /> Like
        </button>

        <button className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100">
          <FiMessageCircle /> Comment
        </button>
      </div>
    </div>
  );
}
