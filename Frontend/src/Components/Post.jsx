import { FiThumbsUp, FiMessageCircle } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";

export default function Post({ data }) {
  const [likes, setLikes] = useState(data.likes.length);
  const [comments, setComments] = useState(data.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [text, setText] = useState("");

  const likePost = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/posts/${data._id}/like`,
      {},
      { withCredentials: true }
    );
    setLikes(res.data.likes);
  };

  const addComment = async () => {
    if (!text.trim()) return;

    await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/posts/${data._id}/comment`,
      { text },
      { withCredentials: true }
    );

    setComments([...comments, { user: { name: "You" }, text }]);
    setText("");
  };

  return (
    <div style={card}>
      <strong>{data.user?.name}</strong>
      <p style={{ fontSize: 12 }}>{new Date(data.createdAt).toLocaleString()}</p>

      <p>{data.content}</p>

      {data.media?.[0] && (
        <img
          src={`${import.meta.env.VITE_REACT_APP_API_URL}${data.media[0].url}`}
          style={{ width: "100%", borderRadius: 10 }}
        />
      )}

      <div style={actions}>
        <button onClick={likePost}><FiThumbsUp /> {likes}</button>
        <button onClick={() => setShowComments(!showComments)}>
          <FiMessageCircle /> {comments.length}
        </button>
      </div>

      {showComments && (
        <>
          {comments.map((c, i) => (
            <p key={i}><b>{c.user.name}:</b> {c.text}</p>
          ))}
          <input
            placeholder="Add comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addComment()}
          />
        </>
      )}
    </div>
  );
}

const card = { background: "white", padding: 16, borderRadius: 12, marginBottom: 16 };
const actions = { display: "flex", gap: 20, marginTop: 12 };
