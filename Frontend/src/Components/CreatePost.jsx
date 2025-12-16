import { FaRegImage, FaRegSmile, FaVideo, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import { UserContext } from "../Layout/Layout";
import { userProfileData } from "../data/userProfile";

export default function CreatePost() {
  const { state, dispatch } = useContext(UserContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [postContent, setPostContent] = useState("");

  const handleFileSelect = (e, fileType) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedFiles([
          ...selectedFiles,
          { type: fileType, url: event.target.result, name: file.name }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handlePostSubmit = () => {
    if (postContent.trim() || selectedFiles.length > 0) {
      const newPost = {
        id: Date.now(),
        name: userProfileData.name,
        headline: userProfileData.headline,
        time: "now",
        content: postContent,
        media: selectedFiles.map(file => ({
          type: file.type === "image" ? "image" : "video",
          url: file.url
        })),
        likes: 0,
        liked: false,
        comments: []
      };
      dispatch({ type: "ADD_POST", payload: newPost });
      setPostContent("");
      setSelectedFiles([]);
    }
  };

  return (
    <div style={{ backgroundColor: "white", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderRadius: "12px", marginBottom: "16px" }}>
      <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
        <img
          src="https://i.pravatar.cc/50"
          alt=""
          style={{ borderRadius: "50%", width: "48px", height: "48px" }}
        />
        <input
          type="text"
          placeholder="Start a post"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          style={{ width: "100%", border: "1px solid #ccc", borderRadius: "24px", padding: "8px 16px", fontSize: "14px" }}
        />
      </div>

      {/* Preview selected files */}
      {selectedFiles.length > 0 && (
        <div style={{ marginBottom: "12px", padding: "12px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "8px" }}>
            {selectedFiles.map((file, index) => (
              <div key={index} style={{ position: "relative", borderRadius: "8px", overflow: "hidden", backgroundColor: "#e0e0e0", aspectRatio: "1" }}>
                {file.type === "image" ? (
                  <img src={file.url} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <video src={file.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
                <button
                  onClick={() => handleRemoveFile(index)}
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white"
                  }}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>{selectedFiles.length} file(s) selected</p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
        <div style={{ display: "flex", gap: "8px", color: "#999" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <FaRegImage />
            <span>Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e, "image")}
              style={{ display: "none" }}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <FaVideo />
            <span>Video</span>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => handleFileSelect(e, "video")}
              style={{ display: "none" }}
            />
          </label>
          <Action icon={<FaRegSmile />} text="Feeling" />
        </div>
        <button
          onClick={handlePostSubmit}
          disabled={!postContent.trim() && selectedFiles.length === 0}
          style={{
            backgroundColor: "#007AFF",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 24px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            opacity: !postContent.trim() && selectedFiles.length === 0 ? 0.5 : 1
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}

function Action({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}
