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

export default function Post({ data }) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [likes, setLikes] = useState(data.likes || 0);
  const [liked, setLiked] = useState(data.liked || false);
  const [comments, setComments] = useState(data.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const hasMedia = data.media?.length > 0;

  /* LIKE */
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${API}/posts/${data.id}/like`,
        {},
        { withCredentials: true }
      );
      setLikes(res.data.likes);
      setLiked(!liked);
    } catch {}
  };

  /* COMMENT */
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `${API}/posts/${data.id}/comment`,
        { text: newComment },
        { withCredentials: true }
      );

      setComments([...comments, { name: "You", text: newComment }]);
      setNewComment("");
    } catch {}
  };

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
          <p className="text-sm font-semibold text-gray-900">
            {data.name}
          </p>
          <p className="text-xs text-gray-500">
            {data.headline || "Student • Alumni Nexus"}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(data.time).toLocaleString()}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      {data.content && (
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {data.content.length > CONTENT_LIMIT ? (
              <>
                {showFullContent
                  ? data.content
                  : data.content.slice(0, CONTENT_LIMIT)}
                {!showFullContent && "... "}
                <span
                  onClick={() => setShowFullContent(!showFullContent)}
                  className="text-blue-600 font-medium cursor-pointer"
                >
                  {showFullContent ? "Show less" : "See more"}
                </span>
              </>
            ) : (
              data.content
            )}
          </p>
        </div>
      )}

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
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              >
                <FiChevronLeft />
              </button>

              <button
                onClick={() =>
                  setMediaIndex((mediaIndex + 1) % data.media.length)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              >
                <FiChevronRight />
              </button>
            </>
          )}
        </div>
      )}

      {/* COUNTS */}
      <div className="px-4 py-2 text-xs text-gray-600 border-b">
        {likes > 0 && (
          <span className="mr-4">👍 {likes}</span>
        )}
        {comments.length > 0 && (
          <span>💬 {comments.length}</span>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-around py-2 text-sm text-gray-600">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-100 ${
            liked ? "text-blue-600 font-medium" : ""
          }`}
        >
          <FiThumbsUp /> Like
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-1 rounded-md hover:bg-gray-100"
        >
          <FiMessageCircle /> Comment
        </button>
      </div>

      {/* COMMENTS */}
      {showComments && (
        <div className="px-4 pb-4">
          {comments.map((c, i) => (
            <div key={i} className="mb-2">
              <p className="text-xs font-semibold text-gray-800">
                {c.name}
              </p>
              <p className="text-sm text-gray-700">
                {c.text}
              </p>
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              placeholder="Add a comment…"
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleAddComment}
              className="text-blue-600 font-medium px-3"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
