import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const StartupForm = () => {
  const navigate = useNavigate();
  const [ideaData, setIdeaData] = useState({
    ideaTitle: "",
    username: "",
    email: "",
    description:"",
    contact: "",
    idea: "",
  });

  const handleChanges = (e) => {
    setIdeaData({ ...ideaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ideaData.ideaTitle || !ideaData.username || !ideaData.description || !ideaData.email || !ideaData.idea) {
      alert("All fields are required!");
      return;
    }
    axios
      .post("http://localhost:5000/api/startup", ideaData)
      .then((result) => {
        console.log("Response:", result.data);
        alert("Idea submitted successfully!");
        navigate("/donations");
        
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("An error occurred while submitting the idea. Please try again.");
      });
  };

  return (
    <div className="bg-[#FFF1E6]">
      <div className="max-w-lg mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Submit Your Startup Idea & Secure Funding from Alumni
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="ideaTitle" className="block text-gray-600 font-medium mb-2">
              Idea Title*
            </label>
            <input
              type="text"
              id="ideaTitle"
              name="ideaTitle"
              value={ideaData.ideaTitle}
              onChange={handleChanges}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium mb-2">
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={ideaData.username}
              onChange={handleChanges}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={ideaData.email}
              onChange={handleChanges}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-600 font-medium mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={ideaData.contact}
              onChange={handleChanges}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="idea" className="block text-gray-600 font-medium mb-2">
              Startup short discription 
            </label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={ideaData.description}
              onChange={handleChanges}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="idea" className="block text-gray-600 font-medium mb-2">
              Startup Idea Details
            </label>
            <textarea
              id="idea"
              name="idea"
              rows="6"
              value={ideaData.idea}
              onChange={handleChanges}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
            >
              Submit Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartupForm;
