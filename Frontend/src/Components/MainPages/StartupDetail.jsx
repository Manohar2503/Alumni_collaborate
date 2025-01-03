import React from 'react';
import { useLocation } from 'react-router-dom';

const StartupDetail = () => {
  const location = useLocation();
  const { donate } = location.state || {}; 

  if (!donate) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <div className="text-white text-xl font-semibold">No startup details found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-50 to-cyan-100">
      <div className="flex justify-center items-center mb-8 ">
        <h1 className="text-4xl md:text-6xl font-extrabold rounded-lg  text-center text-indigo-700 shadow-lg hover:shadow-xl transition duration-300">
          {donate.ideaTitle}
        </h1>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-500">
        <p className="mb-4 text-gray-800">
          <strong className="text-indigo-600">Description:</strong> {donate.description}
        </p>
        <p className="mb-4 text-gray-800">
          <strong className="text-indigo-600">Idea:</strong> {donate.idea}
        </p>
        <p className="mb-4 text-gray-800">
          <strong className="text-indigo-600">Submitted by:</strong> {donate.username}
        </p>
        <p className="mb-4 text-gray-800">
          <strong className="text-indigo-600">Email:</strong> {donate.email}
        </p>
        <p className="mb-4 text-gray-800">
          <strong className="text-indigo-600">Contact:</strong> {donate.contact || 'Not provided'}
        </p>
      </div>
    </div>
  );
};

export default StartupDetail;
