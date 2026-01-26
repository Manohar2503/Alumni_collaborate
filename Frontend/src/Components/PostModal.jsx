import {
  FiX,
  FiThumbsUp,
  FiMessageCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API_URL;

export default function PostModal({ post, onClose }) {
  const [mediaIndex, setMediaIndex] = useState(0);

  const [likes, setLikes] = useState(post?.likes || 0);
  const [liked, setLiked] = useState(post?.liked || false);

  const [comments, setComments] = useState(
    Array.isArray(post?.comments) ? post.comments : []
  );
  const [newComment, setNewComment] = useState("");

  const hasMedia = post?.media?.length > 0;

  // ✅ Close on ESC
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // ✅ reset when post changes
  useEffect(() => {
    setMediaIndex(0);
    setLikes(post?.likes || 0);
    setLiked(post?.liked || false);
    setComments(Array.isArray(post?.comments) ? post.comments : []);
    setNewComment("");
  }, [post]);

  const handleLike = async () => {
    try {
      if (!post?._id) return;

      await axios.post(`${API}/posts/${post._id}/like`, {}, { withCredentials: true });

      setLikes((prev) => (liked ? prev - 1 : prev + 1));
      setLiked((prev) => !prev);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      if (!post?._id) return;

      await axios.post(
        `${API}/posts/${post._id}/comment`,
        { text: newComment },
        { withCredentials: true }
      );

      setComments((prev) => [...prev, { name: "You", text: newComment }]);
      setNewComment("");
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow"
        >
          <FiX className="text-gray-700" size={18} />
        </button>

        {/* ✅ MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-[90vh]">
          {/* ================= LEFT MEDIA ================= */}
          <div className="bg-black flex items-center justify-center relative">
            {hasMedia ? (
              <>
                {post.media[mediaIndex]?.type === "image" ? (
                  <img
                    src={post.media[mediaIndex].url}
                    alt="post"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video
                    src={post.media[mediaIndex].url}
                    controls
                    className="w-full h-full object-contain"
                  />
                )}

                {/* ✅ Arrows */}
                {post.media.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setMediaIndex(
                          (prev) => (prev - 1 + post.media.length) % post.media.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full"
                    >
                      <FiChevronLeft size={18} />
                    </button>

                    <button
                      onClick={() =>
                        setMediaIndex((prev) => (prev + 1) % post.media.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full"
                    >
                      <FiChevronRight size={18} />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="text-white text-sm opacity-70">
                No media in this post
              </div>
            )}
          </div>

          {/* ================= RIGHT DETAILS ================= */}
          <div className="flex flex-col h-full">
            {/* ✅ HEADER */}
            <div className="p-4 border-b flex items-center gap-3">
              <img
                src={post.author?.profileImage || "https://i.pravatar.cc/45"}
                alt="author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {post.author?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {post.author?.headline || ""}
                </p>
                <p className="text-[11px] text-gray-400 mt-[2px]">
                  {post.time ? new Date(post.time).toLocaleString() : ""}
                </p>
              </div>
            </div>

            {/* ✅ CONTENT + COMMENTS SCROLL */}
            <div className="flex-1 overflow-y-auto p-4">
              {post.content && (
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </p>
              )}

              {/* ✅ Like + Comment counts */}
              <div className="mt-4 text-xs text-gray-600 flex gap-4 border-b pb-3">
                {likes > 0 && <span>👍 {likes}</span>}
                {comments.length > 0 && <span>💬 {comments.length}</span>}
              </div>

              {/* ✅ Comments */}
              <div className="mt-3">
                {comments.length === 0 ? (
                  <p className="text-sm text-gray-400">No comments yet</p>
                ) : (
                  comments.map((c, i) => (
                    <div key={i} className="py-2">
                      <p className="text-xs font-semibold text-gray-900">
                        {c.name || "User"}
                      </p>
                      <p className="text-sm text-gray-700">{c.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ✅ ACTIONS */}
            <div className="border-t p-3 flex items-center justify-around text-sm text-gray-600">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 ${
                  liked ? "text-[#0A66C2] font-semibold" : ""
                }`}
              >
                <FiThumbsUp />
                Like
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <FiMessageCircle />
                Comment
              </button>
            </div>

            {/* ✅ COMMENT BOX */}
            <div className="p-3 border-t flex gap-2">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Add a comment..."
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 rounded-full bg-[#0A66C2] text-white font-semibold hover:bg-[#084E96]"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
