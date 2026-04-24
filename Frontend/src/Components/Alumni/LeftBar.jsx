import React, { useState, useEffect } from "react";
import axios from "axios";

import { extractCollection } from "../../api/responseUtils";

const LeftBar = ({ page, filters, setFilters }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          page === "jobs"
            ? `${import.meta.env.VITE_REACT_APP_API_URL}/oppurtunities/getJobs`
            : `${import.meta.env.VITE_REACT_APP_API_URL}/oppurtunities/getInternships`;

        const response = await axios.get(url);
        setData(extractCollection(response.data));
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        setData([]);
      }
    };

    fetchData();
  }, [page]);

  const companies = [...new Set(data.map((item) => item.company))];

  const handleCompaniesChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      selectedCompanies: e.target.checked
        ? [...prev.selectedCompanies, value]
        : prev.selectedCompanies.filter((item) => item !== value),
    }));
  };

  return (
    <div className="sticky top-20 h-screen bg-white p-5 rounded-lg">
      <p className="text-xl font-semibold text-blue-600 mb-4">Filters</p>

      <div className="space-y-6 overflow-y-auto pr-2">
        {(page === "internships" || page === "jobs") && (
          <div>
            <p className="font-medium text-gray-700 mb-3">Select Company</p>

            <div className="space-y-2">
              {companies.map((item, index) => (
                <label
                  key={index}
                  htmlFor={item.replace(/\s/g, "")}
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                >
                  <input
                    type="checkbox"
                    id={item.replace(/\s/g, "")}
                    value={item}
                    checked={filters.selectedCompanies.includes(item)}
                    onChange={handleCompaniesChange}
                    className="accent-blue-600 w-4 h-4 cursor-pointer"
                  />

                  <span className="text-gray-700 text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftBar;
