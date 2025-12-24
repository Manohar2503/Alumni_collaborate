import { FaRegImage, FaVideo, FaTimes } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreatePost({ onPostCreated }) {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  /* FILE SELECT */
  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...selected]);
  };

  /* REMOVE FILE */
  const removeFile = (index) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles(files.filter((_, i) => i !== index));
  };

  /* SUBMIT POST */
  const submitPost = async () => {
    if (!content.trim() && files.length === 0) return;

    const formData = new FormData();
    formData.append("content", content);

    files.forEach(({ file }) => {
      if (file.type.startsWith("image")) {
        formData.append("images", file);
      } else if (file.type.startsWith("video")) {
        formData.append("videos", file);
      }
    });

    try {
      setLoading(true);

      await axios.post(`${API}/posts`, formData, {
        withCredentials: true,
      });

      files.forEach((f) => URL.revokeObjectURL(f.preview));
      setFiles([]);
      setContent("");
      onPostCreated?.();
    } catch (err) {
      alert("Post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl mb-4">
      {/* TEXT AREA */}
      <div className="p-1 pb-1 border-b border-gray-100">
        <textarea
          placeholder="Start a post…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full resize-none text-[14px] leading-relaxed text-gray-800 placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* MEDIA PREVIEW */}
      {files.length > 0 && (
        <div className="px-4 pb-3 grid grid-cols-3 gap-2">
          {files.map(({ file, preview }, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden">
              {file.type.startsWith("image") ? (
                <img
                  src={preview}
                  className="h-24 w-full object-cover"
                  alt=""
                />
              ) : (
                <video
                  src={preview}
                  className="h-24 w-full object-cover"
                  muted
                />
              )}

              <button
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
              >
                <FaTimes size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ACTION BAR */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100">
        <div className="flex gap-4 text-gray-600">
          <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <FaRegImage />
            <span className="text-sm">Photo</span>
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleFileSelect}
            />
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <FaVideo />
            <span className="text-sm">Video</span>
            <input
              type="file"
              multiple
              accept="video/*"
              hidden
              onChange={handleFileSelect}
            />
          </label>
        </div>

        <button
          onClick={submitPost}
          disabled={loading}
          className={`px-4 py-1.5 text-sm rounded-full font-medium transition ${
            loading
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting…" : "Post"}
        </button>
      </div>
    </div>
  );
}
