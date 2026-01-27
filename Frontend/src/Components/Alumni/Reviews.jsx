import React, { useState } from "react";
import axios from "axios";
import { HiStar, HiOutlineStar } from "react-icons/hi";

const Reviews = () => {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stars) {
      alert("Please select a star rating");
      return;
    }

    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

      await axios.post(
  `${baseUrl}/users/postReview`,
  { review, stars },
  { withCredentials: true }
);


      setReview("");
      setStars(0);
      alert("Review submitted!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
    <button
            onClick={() => window.history.back()}
            className="text-sm font-medium p-6"
          >
            ← Back
          </button>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
    
    {/* Card */}
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5 sm:p-6">

      <p className="text-xl font-semibold text-center mb-1">
        Post a Review
      </p>

      <p className="text-sm text-gray-500 text-center mb-4">
        Take a moment to share your feedback
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ⭐ Star Rating */}
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              onClick={() => setStars(index + 1)}
              className="cursor-pointer transition-transform hover:scale-110"
            >
              {index < stars ? (
                <HiStar className="w-8 h-8 text-yellow-400" />
              ) : (
                <HiOutlineStar className="w-8 h-8 text-gray-400" />
              )}
            </span>
          ))}
        </div>

        {/* 📝 Review Input */}
        <textarea
          rows="4"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* 🚀 Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Posting..." : "Submit Review"}
        </button>

      </form>

    </div>

  </div>
  </div>
);

};

export default Reviews;
