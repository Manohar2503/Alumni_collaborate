import React, { useState } from "react";
import JobsResources from "./JobsResources";
import LeftBar from "./LeftBar";
import { X } from "lucide-react";

const JobsInternships = () => {

  const initialFilters = {
    selectedCompanies: [],
  };

  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("jobs");
  const [filters, setFilters] = useState(initialFilters);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-white px-4 py-3 shadow sticky top-0 z-20">

        <div className="flex items-center gap-3">

          <button
            onClick={() => window.history.back()}
            className="text-sm font-medium text-gray-700"
          >
            ← Back
          </button>

          {(activeTab === "jobs" || activeTab === "internships") && (
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden ml-auto bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm"
            >
              Filters
            </button>
          )}

        </div>

        <div className="flex gap-3 mt-3 overflow-x-auto">

          {[
            { key: "jobs", label: "Jobs" },
            { key: "internships", label: "Internships" },
            { key: "postOpportunity", label: "Post Opportunity" },
          ].map((tab) => (

            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
            >
              {tab.label}
            </button>

          ))}

        </div>

      </div>

      <div className="flex">

        {(activeTab === "jobs" || activeTab === "internships") && (

  <div className="hidden md:flex flex-col w-[280px] bg-white p-5 border-r sticky top-[88px] h-[calc(100vh-88px)]">

    {/* Filters Scroll Area */}
    <div className="flex-1 overflow-y-auto">

      <LeftBar
        page={activeTab}
        filters={filters}
        setFilters={setFilters}
      />

    </div>

    {/* Clear Button Fixed At Bottom */}
    <button
      onClick={handleClearFilters}
      disabled={filters.selectedCompanies.length === 0}
      className="mt-4 w-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 py-2 rounded"
    >
      Clear Filters
    </button>

  </div>

)}


        <div className="flex-1 p-4 md:p-8 w-full md:max-w-[1200px] md:mx-auto">

          <JobsResources
            page={activeTab}
            filters={filters}
          />

        </div>

      </div>

      {showFilters && (

        <div className="fixed inset-0 z-40 bg-black/40 md:hidden">

          <div className="bg-white h-full w-full p-5 relative">

            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-4 right-4"
            >
              <X size={22} />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Filters
            </h2>

            <LeftBar
              page={activeTab}
              filters={filters}
              setFilters={setFilters}
            />

            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Apply Filters
            </button>

            <button
              onClick={handleClearFilters}
              className="mt-3 w-full bg-gray-200 py-2 rounded-lg"
            >
              Clear Filters
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default JobsInternships;
