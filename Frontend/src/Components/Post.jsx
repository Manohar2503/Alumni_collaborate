import {
  FiThumbsUp,
  FiMessageCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";
import axios from "axios";

export default function Post({ data }) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [comments, setComments] = useState(data.comments || []);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(data.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);

  const hasMedia = data.media && data.media.length > 0;

  const likePost = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/posts/${data._id}/like`,
        {},
        { withCredentials: true }
      );
      setLikes(res.data.likes);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/posts/${data._id}/comment`,
        { text: newComment },
        { withCredentials: true }
      );

      setComments((prev) => [
        ...prev,
        { user: { name: "You" }, text: newComment },
      ]);
      setNewComment("");
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  return (
    <div
      style={{
        background: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: 4 }}>{data.user?.name}</h3>
      <p style={{ fontSize: 12, color: "#666" }}>
        {new Date(data.createdAt).toLocaleString()}
      </p>

      <p style={{ marginTop: 8 }}>{data.content}</p>

      {/* MEDIA */}
      {hasMedia && (
        <div style={{ position: "relative", marginTop: 10 }}>
          {data.media[mediaIndex].type === "image" ? (
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL}${data.media[mediaIndex].url}`}
              style={{ width: "100%", borderRadius: 12 }}
              alt=""
            />
          ) : (
            <video
              src={`${import.meta.env.VITE_REACT_APP_API_URL}${data.media[mediaIndex].url}`}
              controls
              style={{ width: "100%", borderRadius: 12 }}
            />
          )}

          {data.media.length > 1 && (
            <>
              <FiChevronLeft
                onClick={() =>
                  setMediaIndex(
                    (mediaIndex - 1 + data.media.length) % data.media.length
                  )
                }
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "50%",
                }}
                size={22}
              />
              <FiChevronRight
                onClick={() =>
                  setMediaIndex((mediaIndex + 1) % data.media.length)
                }
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "50%",
                }}
                size={22}
              />
            </>
          )}
        </div>
      )}

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
        <button onClick={likePost} style={{ cursor: "pointer" }}>
          <FiThumbsUp /> {likes}
        </button>

        <button
          onClick={() => setShowComments((s) => !s)}
          style={{ cursor: "pointer" }}
        >
          <FiMessageCircle /> {comments.length}
        </button>
      </div>

      {/* COMMENTS */}
      {showComments && (
        <div style={{ marginTop: 10 }}>
          {comments.map((c, i) => (
            <p key={i} style={{ fontSize: 14 }}>
              <strong>{c.user?.name}:</strong> {c.text}
            </p>
          ))}

          <input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addComment()}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 6,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
        </div>
      )}
    </div>
  );
}
