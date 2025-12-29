import {
  FiThumbsUp,
  FiMessageCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Layout/Layout";
import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API_URL;
const CONTENT_LIMIT = 220; // characters to show initially

export default function Post({ data }) {
  const { profile } = useContext(UserContext);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [likes, setLikes] = useState(data.likes || 0);
  const [liked, setLiked] = useState(data.liked || false);
  const [comments, setComments] = useState(data.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const hasMedia = data.media && data.media.length > 0;

  /* ---------------- LIKE / UNLIKE ---------------- */
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${API}/posts/${data.id}/like`,
        {},
        { withCredentials: true }
      );
      setLikes(res.data.likes);
      setLiked(!liked);
    } catch (err) {
      console.error("Like failed");
    }
  };

  /* ---------------- ADD COMMENT ---------------- */
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `${API}/posts/${data.id}/comment`,
        { text: newComment },
        { withCredentials: true }
      );

      setComments([
        ...comments,
        { name: "You", text: newComment },
      ]);
      setNewComment("");
    } catch (err) {
      console.error("Comment failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      {/* USER HEADER */}
      <div className="flex gap-3 mb-3">
        <img
          src={(profile && profile.profileImage) || "https://i.pravatar.cc/45"}
          className="rounded-full w-11 h-11"
          alt=""
        />
        <div>
          <h3 className="font-semibold">{data.name}</h3>
          <p className="text-sm text-gray-500">{data.headline}</p>
          <span className="text-xs text-gray-400">
            {new Date(data.time).toLocaleString()}
          </span>
        </div>
      </div>

      {/* CONTENT WITH SEE MORE */}
      <p className="text-gray-800 mb-3 whitespace-pre-wrap">
        {data.content?.length > CONTENT_LIMIT ? (
          <>
            {showFullContent
              ? data.content
              : data.content.slice(0, CONTENT_LIMIT)}

            {!showFullContent && "... "}

            <span
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-600 font-semibold cursor-pointer ml-1"
            >
              {showFullContent ? "Show less" : "See more"}
            </span>
          </>
        ) : (
          data.content
        )}
      </p>

      {/* MEDIA */}
      {hasMedia && (
        <div className="relative rounded-xl overflow-hidden bg-black mb-3">
          {data.media[mediaIndex].type === "image" ? (
            <img
              src={data.media[mediaIndex].url}
              className="w-full max-h-[380px] object-cover"
              alt=""
            />
          ) : (
            <video
              src={data.media[mediaIndex].url}
              controls
              className="w-full max-h-[380px] object-cover"
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
                  setMediaIndex(
                    (mediaIndex + 1) % data.media.length
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
              >
                <FiChevronRight />
              </button>
            </>
          )}
        </div>
      )}

      {/* LIKE & COMMENT COUNT */}
      <div className="text-sm text-gray-600 border-b pb-2 mb-2">
        👍 <strong>{likes}</strong> likes
        {comments.length > 0 && (
          <span className="ml-4">
            💬 <strong>{comments.length}</strong> comments
          </span>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-around py-2 text-gray-600">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 ${
            liked ? "text-blue-600 font-semibold" : ""
          }`}
        >
          <FiThumbsUp /> Like
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2"
        >
          <FiMessageCircle /> Comment
        </button>
      </div>

      {/* COMMENTS */}
      {showComments && (
        <div className="mt-3 border-t pt-3">
          {comments.map((c, i) => (
            <div key={i} className="mb-2">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-sm text-gray-600">{c.text}</p>
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              placeholder="Add a comment..."
              className="flex-1 border rounded-full px-4 py-2 text-sm"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
