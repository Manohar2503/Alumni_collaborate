import { FaRegImage, FaVideo, FaTimes } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const submitPost = async () => {
    if (!content.trim() && files.length === 0) {
      alert("Post cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);

    files.forEach((file) => {
      if (file.type.startsWith("image")) {
        formData.append("images", file);
      } else if (file.type.startsWith("video")) {
        formData.append("videos", file);
      }
    });

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/posts/create`,
        formData,
        { withCredentials: true }
      );

      onPostCreated(res.data.data);
      setContent("");
      setFiles([]);
    } catch (err) {
      alert(err.response?.data?.message || "Post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "white", padding: 16, borderRadius: 12, marginBottom: 16 }}>
      <input
        placeholder="Start a post"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 24,
          border: "1px solid #ccc",
        }}
      />

      {/* Preview */}
      {files.length > 0 && (
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          {files.map((file, i) => (
            <div key={i} style={{ position: "relative" }}>
              {file.type.startsWith("image") ? (
                <img src={URL.createObjectURL(file)} width={80} />
              ) : (
                <video src={URL.createObjectURL(file)} width={80} />
              )}
              <button
                onClick={() => removeFile(i)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "black",
                  color: "white",
                  borderRadius: "50%",
                  border: "none",
                }}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <label>
            <FaRegImage /> Image
            <input hidden type="file" multiple accept="image/*" onChange={handleFileChange} />
          </label>
          <label>
            <FaVideo /> Video
            <input hidden type="file" multiple accept="video/*" onChange={handleFileChange} />
          </label>
        </div>

        <button
          onClick={submitPost}
          disabled={loading}
          style={{
            background: "#007AFF",
            color: "white",
            border: "none",
            padding: "8px 24px",
            borderRadius: 6,
          }}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
