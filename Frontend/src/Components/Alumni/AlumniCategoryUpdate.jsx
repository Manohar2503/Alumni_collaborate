import React, { useEffect, useState } from "react";
import axios from "axios";

const AlumniCategoryUpdate = () => {
  const [tracks, setTracks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [trackId, setTrackId] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [trackDescription, setTrackDescription] = useState("");
  const [isTrackOther, setIsTrackOther] = useState(false);

  const [categoryId, setCategoryId] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isCategoryOther, setIsCategoryOther] = useState(false);

  const [paidLinks, setPaidLinks] = useState("");
  const [unpaidLinks, setUnpaidLinks] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/learningtracks/gettracks`)
      .then((res) => setTracks(res.data))
      .catch(() => setError("Failed to load tracks"));
  }, []);

  const handleTrackChange = (e) => {
    const value = e.target.value;
    if (value === "other") {
      setIsTrackOther(true);
      setTrackId("other");
      setCategories([]);
      setTrackTitle("");
      setTrackDescription("");
    } else {
      const track = tracks.find((t) => t.trackId === value);
      setTrackId(track.trackId);
      setTrackTitle(track.title);
      setTrackDescription(track.description || "");
      setCategories(track.categories || []);
      setIsTrackOther(false);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "other") {
      setIsCategoryOther(true);
      setCategoryId("");
      setCategoryTitle("");
    } else {
      const cat = categories.find((c) => c.categoryId === value);
      setCategoryId(cat.categoryId);
      setCategoryTitle(cat.title);
      setIsCategoryOther(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!trackTitle || !categoryTitle) {
      setError("All required fields must be filled");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/learningtracks/upsert`, {
        trackId:
          trackId === "other"
            ? trackTitle.toLowerCase().replace(/\s+/g, "-")
            : trackId,
        title: trackTitle,
        description: trackDescription || undefined, // optional
        categoryId,
        categoryTitle,
        paidLinks: paidLinks
          ? paidLinks.split(",").map((l) => l.trim())
          : [],
        unpaidLinks: unpaidLinks
          ? unpaidLinks.split(",").map((l) => l.trim())
          : [],
      });

      setSuccess("Submitted successfully 🎉");
      setPaidLinks("");
      setUnpaidLinks("");
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl space-y-4 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-center">
          Alumni Category Update
        </h2>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <label className="block font-medium">
          Select Track <span className="text-red-600">*</span>
        </label>
        <select
          className="w-full p-3 border rounded-lg"
          onChange={handleTrackChange}
          required
        >
          <option value="">Select Track</option>
          {tracks.map((t) => (
            <option key={t.trackId} value={t.trackId}>
              {t.title}
            </option>
          ))}
          <option value="other">Other</option>
        </select>

        {isTrackOther && (
          <>
            <input
              className="w-full p-3 border rounded-lg animate-fade-in"
              placeholder="Enter new track"
              value={trackTitle}
              onChange={(e) => setTrackTitle(e.target.value)}
              required
            />
            <input
              className="w-full p-3 border rounded-lg animate-fade-in"
              placeholder="Enter track description (optional)"
              value={trackDescription}
              onChange={(e) => setTrackDescription(e.target.value)}
            />
          </>
        )}

        {trackId && (
          <>
            <label className="block font-medium">
              Select Category <span className="text-red-600">*</span>
            </label>
            <select
              className="w-full p-3 border rounded-lg"
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.title}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </>
        )}

        {isCategoryOther && (
          <>
            <input
              className="w-full p-3 border rounded-lg animate-fade-in"
              placeholder="Enter new category"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              required
            />
            
          </>
        )}

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Paid links (comma separated)"
          value={paidLinks}
          onChange={(e) => setPaidLinks(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Unpaid links (comma separated)"
          value={unpaidLinks}
          onChange={(e) => setUnpaidLinks(e.target.value)}
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AlumniCategoryUpdate;
