import { FiThumbsUp, FiMessageCircle, FiShare2, FiUserPlus, FiChevronLeft, FiChevronRight, FiX, FiCheck } from "react-icons/fi";
import { useState, useContext } from "react";
import { UserContext } from "../Layout/Layout";

export default function Post({ data }) {
  const { dispatch } = useContext(UserContext);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(data.comments || []);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const CONTENT_PREVIEW_LENGTH = 220;

  const hasMultipleMedia = data.media && data.media.length > 1;

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % data.media.length);
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + data.media.length) % data.media.length);
  };

  const handleLike = () => {
    const newLiked = !data.liked;
    const newLikes = newLiked ? (data.likes || 0) + 1 : (data.likes || 0) - 1;
    dispatch({
      type: "LIKE_POST",
      payload: { postId: data.id, likes: newLikes, liked: newLiked }
    });
  };

  const handleFollow = () => {
    setIsFollowing((s) => !s);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        name: "You",
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div style={{ backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <img
          src="https://i.pravatar.cc/45"
          style={{ borderRadius: "50%" }}
          alt=""
        />
        <div>
          <h3 style={{ fontWeight: "600", margin: 0 }}>{data.name}</h3>
          <p style={{ fontSize: "14px", color: "#999", margin: 0 }}>{data.headline}</p>
          <span style={{ fontSize: "12px", color: "#999" }}>{data.time}</span>
        </div>
      </div>

      <p style={{ marginTop: "12px", color: "#333", whiteSpace: "pre-wrap" }}>
        {data.content && data.content.length > CONTENT_PREVIEW_LENGTH ? (
          <>
            {showFull ? data.content : data.content.slice(0, CONTENT_PREVIEW_LENGTH)}
            {!showFull && "... "}
            <span
              onClick={() => setShowFull((s) => !s)}
              style={{ color: "#0A66C2", cursor: "pointer", fontWeight: 600 }}
            >
              {showFull ? "show less" : "more"}
            </span>
          </>
        ) : (
          data.content
        )}
      </p>

      {data.media && data.media.length > 0 && (
        <div style={{ position: "relative", marginTop: "12px", borderRadius: "12px", overflow: "hidden", backgroundColor: "#000" }}>
          {data.media[currentMediaIndex].type === "image" ? (
            <img
              src={data.media[currentMediaIndex].url}
              alt=""
              style={{ borderRadius: "12px", maxHeight: "320px", objectFit: "cover", width: "100%" }}
            />
          ) : (
            <video
              src={data.media[currentMediaIndex].url}
              style={{ borderRadius: "12px", maxHeight: "320px", objectFit: "cover", width: "100%" }}
              controls
            />
          )}

          {hasMultipleMedia && (
            <>
              <button
                onClick={handlePrevMedia}
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  hover: { backgroundColor: "rgba(255,255,255,0.9)" }
                }}
              >
                <FiChevronLeft size={20} />
              </button>

              <button
                onClick={handleNextMedia}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                <FiChevronRight size={20} />
              </button>

              <div style={{
                position: "absolute",
                bottom: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                padding: "6px 12px",
                borderRadius: "12px",
                fontSize: "12px"
              }}>
                {currentMediaIndex + 1} / {data.media.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* Like and Comments Summary */}
      <div style={{ marginTop: "12px", padding: "8px 0", fontSize: "13px", color: "#666", borderBottom: "1px solid #eee" }}>
        <div style={{ marginBottom: "8px" }}>👍 <strong>{data.likes || 0}</strong> likes</div>
        {comments.length > 0 && (
          <div>💬 <strong>{comments.length}</strong> comments</div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "12px", color: "#666", paddingTop: "0px" }}>
        <PostButton
          icon={<FiThumbsUp />}
          text="Like"
          onClick={handleLike}
          isActive={data.liked}
        />
        <PostButton
          icon={<FiMessageCircle />}
          text="Comment"
          onClick={() => setShowComments(!showComments)}
        />
        <PostButton icon={<FiShare2 />} text="Share" />
        {/* Follow / Following button */}
        {isFollowing ? (
          <div
            onClick={handleFollow}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              backgroundColor: "#f3f4f6",
              color: "#333",
              padding: "6px 12px",
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
              fontWeight: 600
            }}
          >
            <FiCheck />
            <span>Following</span>
          </div>
        ) : (
          <PostButton icon={<FiUserPlus />} text="Follow" onClick={handleFollow} />
        )}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #eee" }}>
          <h4 style={{ fontSize: "13px", fontWeight: "600", marginBottom: "12px", color: "#333" }}>Comments ({comments.length})</h4>

          {/* Display existing comments */}
          <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "12px" }}>
            {comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" }}>
                <p style={{ fontWeight: "600", fontSize: "13px", margin: 0, color: "#333" }}>{comment.name}</p>
                <p style={{ fontSize: "13px", margin: "4px 0 0 0", color: "#666" }}>{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Add new comment */}
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: "20px",
                padding: "8px 12px",
                fontSize: "13px",
                outline: "none"
              }}
            />
            <button
              onClick={handleAddComment}
              style={{
                backgroundColor: "#007AFF",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PostButton({ icon, text, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        color: isActive ? "#007AFF" : "#666",
        fontWeight: isActive ? "600" : "400"
      }}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
