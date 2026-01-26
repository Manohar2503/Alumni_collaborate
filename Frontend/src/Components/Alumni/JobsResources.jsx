import React, { useEffect, useState } from "react";
import axios from "axios";
import PostOppurtunity from "./PostOppurtunity"

const JobsResources = ({ page, filters }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (page === "postOpportunity") return;

    const fetchData = async () => {
      try {
        const url =
          page === "jobs"
            ? "http://localhost:5001/api/oppurtunities/getJobs"
            : "http://localhost:5001/api/oppurtunities/getInternships";

        const res = await axios.get(url);
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setData([]);
      }
    };

    fetchData();
  }, [page]);

  if (page === "postOpportunity") {
    return <PostOppurtunity/>
  }

  const filteredJobs = data.filter(
    (job) =>
      filters.selectedCompanies.length === 0 ||
      filters.selectedCompanies.includes(job.company)
  );

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-5
      "
    >
      {filteredJobs.map((item) => (
        <div
          key={item._id}
          className="
            bg-white
            p-5
            border
            rounded-xl
            shadow-sm
            hover:shadow-lg
            transition
          "
        >
          <p className="font-semibold text-lg">{item.company}</p>
          <p className="text-gray-600">{item.role}</p>

          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-blue-600 text-sm underline"
          >
            Apply Now →
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobsResources;
