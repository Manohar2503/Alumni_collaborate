import { FaRegImage, FaVideo } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitPost = async () => {
    if (!content.trim() && files.length === 0) return;

    const formData = new FormData();
    formData.append("content", content);
    files.forEach((f) => formData.append("images", f));

    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/posts`,
      formData,
      { withCredentials: true }
    );
    setLoading(false);

    onPostCreated(res.data.data);
    setContent("");
    setFiles([]);
  };

  return (
    <div style={card}>
      <textarea
        placeholder="Share something with alumni..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={textarea}
      />

      <div style={actions}>
        <label style={iconBtn}>
          <FaRegImage /> Photo
          <input type="file" multiple hidden onChange={(e) => setFiles([...e.target.files])} />
        </label>

        <label style={iconBtn}>
          <FaVideo /> Video
        </label>

        <button onClick={submitPost} style={postBtn}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

const card = { background: "white", padding: 16, borderRadius: 12, marginBottom: 16 };
const textarea = { width: "100%", minHeight: 80, borderRadius: 10, padding: 12 };
const actions = { display: "flex", justifyContent: "space-between", marginTop: 12 };
const iconBtn = { display: "flex", gap: 6, cursor: "pointer" };
const postBtn = { background: "#0A66C2", color: "white", border: "none", padding: "8px 20px", borderRadius: 20 };
