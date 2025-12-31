import React, { useState } from "react";
import totaldata from "../../data/learning.json";
import Course from "./Course";

const CareerResources = () => {
  const data = totaldata.learningTracks;
  const [activeTab, setActiveTab] = useState(data[0].trackId);

  return (
    <div className="min-h-screen">
      <h1 className="text-xl font-bold text-center p-6">
        Welcome to our learning resources...!
      </h1>

      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 w-max p-4">
          {data.map((path) => (
            <button
              key={path.trackId}
              onClick={() => setActiveTab(path.trackId)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium ${
                activeTab === path.trackId
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-400 hover:text-blue-600"
              }`}
            >
              {path.trackId}
            </button>
          ))}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        <Course tab={activeTab} />
      </div>
    </div>
  );
};

export default CareerResources;
