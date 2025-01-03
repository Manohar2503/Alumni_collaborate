import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const NewmentorForm = () => {
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState({
    title: "",
    time: "",
    registration: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mentorData.title || !mentorData.time || !mentorData.registration) {
      alert("All fields are required!");
      return;
    }
    
    try {
      
      const response = await axios.post(
        "http://localhost:5000/api/newMentor",
        mentorData,{
          withCredentials: true, // Important to include cookies
        }
      );

      console.log("Response:", response.data);
      alert("New mentor session submitted successfully!");
      navigate("/mentor");
    } catch (err) {
      console.error("Error:", err);
      alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : "An error occurred while submitting the session details. Please try again."
      );
    }
  };

  const handleChanges = (e) => {
    setMentorData({ ...mentorData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100 py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
          Mentor Submission Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={mentorData.title}
              onChange={handleChanges}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the event title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date and Time
            </label>
            <input
              type="text"
              name="time"
              value={mentorData.time}
              onChange={handleChanges}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the date and time"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Link
            </label>
            <input
              type="text"
              name="registration"
              value={mentorData.registration}
              onChange={handleChanges}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the registration link"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewmentorForm;