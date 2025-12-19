import { FaRegImage, FaVideo, FaTimes } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function CreatePost({ onPostCreated }) {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (index) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles(files.filter((_, i) => i !== index));
  };

  const submitPost = async () => {
    if (!content.trim() && files.length === 0) return;

    const formData = new FormData();
    formData.append("content", content);

    files.forEach(({ file }) => {
      if (file.type.startsWith("image")) {
        formData.append("images", file);
      } else {
        formData.append("videos", file);
      }
    });

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/posts`,
        formData,
        { withCredentials: true }
      );

      files.forEach(f => URL.revokeObjectURL(f.preview));
      setContent("");
      setFiles([]);
      onPostCreated();
    } catch (err) {
      alert("Post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <input
        placeholder="Start a post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded-full px-4 py-2 mb-3"
      />

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {files.map(({ file, preview }, i) => (
            <div key={i} className="relative">
              {file.type.startsWith("image") ? (
                <img
                  src={preview}
                  className="rounded-lg object-cover h-24 w-full"
                />
              ) : (
                <video
                  src={preview}
                  className="rounded-lg object-cover h-24 w-full"
                  muted
                />
              )}

              <button
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 bg-black text-white rounded-full p-1"
              >
                <FaTimes size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <label className="cursor-pointer flex gap-2 items-center">
            <FaRegImage />
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleFileSelect}
            />
          </label>

          <label className="cursor-pointer flex gap-2 items-center">
            <FaVideo />
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
          className="bg-blue-600 text-white px-6 py-1 rounded"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
