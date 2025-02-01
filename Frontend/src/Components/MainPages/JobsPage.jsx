import React, { useEffect, useState } from "react";
import jobs from "../../assets/data/Jobs";
import { FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBuildingColumns } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

const Card = ({ job }) => {
  return (
    <div className="bg-white w-full border border-gray-300 rounded-xl shadow-lg p-5 mb-5 hover:bg-gray-100 transition-colors duration-300">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xs mb-1">{job.type.toUpperCase()}</h3>
          <h2 className="font-semibold text-gray-900 mb-5">{job.role}</h2>
        </div>
        <h3 className="text-gray-500 text-sm">{job.createdAt}</h3>
      </div>
      <div className="pl-10">
        {job.company && (
          <h2 className="text-gray-400 text-sm mb-2">
            COMPANY : <span className="text-black text-md">{job.company}</span>
          </h2>
        )}
        {job.location && (
          <h2 className="text-gray-400 text-sm mb-2">
            LOCATION :{" "}
            <span className="text-black text-md">{job.location}</span>
          </h2>
        )}
        {job.role && (
          <h2 className="text-gray-400 text-sm mb-2">
            ROLE : <span className="text-black text-md">{job.role}</span>
          </h2>
        )}
        {job.skills && (
          <h2 className="text-gray-400 mb-2 text-sm">
            SKILLS : <span className="text-black text-md">{job.skills}</span>
          </h2>
        )}
      </div>
      <div className="mt-5 text-right">
        <button className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-blue-600">
          <a href={job.link} target="_blank" rel="noopener noreferrer">
            Apply
          </a>
        </button>
      </div>
    </div>
  );
};

const JobsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [filter, setFilter] = useState(false);
    const [jobsData, setJobsData] = useState([]);
    useEffect(() => {
        const GetAllPosts = async ()=>{
            try{
                
                const res = await fetch("http://localhost:5000/api/jobs/getJobs",{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if(res.ok){
                    const result = await res.json();
                    console.log(result.data);
                    setJobsData(result.data);
                    
                }
            }catch(e){
                alert("Error: " + e.message);
            }
        }

        GetAllPosts();// call the function
    },[]);
  
    const locations = [...new Set(jobsData.map((job) => job.location))];
    const companies = [...new Set(jobsData.map((job) => job.company))];
  
    // Filter jobs based on search query and selected filter
    const filteredJobs = jobsData.filter((job) => {
      const query = searchQuery.toLowerCase();
  
      return (
        job.role.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query)
      );
    });
  
    const selectedFilterJobs = jobsData.filter((job) => {
      const query = selectedFilter.toLowerCase();
  
      return (
        job.type.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query)
      );
    });
  
    // Handle Clear Filter
    const clearFilter = () => {
      setSearchQuery("");
      setSelectedFilter("");
      setFilter(false);
    };
  
    return (
      <div className="flex flex-wrap h-auto min-h-screen bg-[#fffbeb]">
        {/* Left Sidebar */}
        <aside className=" w-full h-full md:w-1/4 bg-white text-black p-3 m-2 md:m-10 border border-gray-300 rounded-lg shadow-md " >
          <div >
            <div
              className="flex p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setSelectedFilter("Full Time");
                setFilter(true);
              }}
            >
              <FaBriefcase size={40} color="black" className="h-6 w-6" />
              <h1 className="pl-5">Jobs</h1>
            </div>
            <div
              className="flex p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setSelectedFilter("Internship");
                setFilter(true);
              }}
            >
              <IoPerson size={40} color="black" className="h-6 w-6" />
              <h1 className="pl-5">Internships</h1>
            </div>
            <div>
              <div className="flex p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200">
                <FaBuildingColumns size={40} color="black" className="h-6 w-6" />
                <h1 className="pl-5">Company</h1>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {companies.map((company, index) => (
                  <h1
                    key={index}
                    onClick={() => {
                      setSelectedFilter(company);
                      setFilter(true);
                    }}
                    className="pl-12 py-2 text-xs border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                  >
                    {company}
                  </h1>
                ))}
              </div>
            </div>
            <div>
              <div className="flex p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200">
                <FaLocationDot size={40} color="black" className="h-6 w-6" />
                <h1 className="pl-5">Location</h1>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {locations.map((location, index) => (
                  <h1
                    key={index}
                    onClick={() => {
                      setSelectedFilter(location);
                      setFilter(true);
                    }}
                    className="pl-12 py-2 text-xs border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                  >
                    {location}
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </aside>
  
        {/* Main Content */}
        <main className="w-full md:flex-1 p-3 m-2 md:my-10 md:mr-5">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Type a Job Area, Location or a Job Title to filter the jobs"
              className="p-3 w-full border border-gray-300 shadow-md rounded-md focus:outline-none focus:ring-1 focus:ring-blue-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <p className="text-xs pl-3 pt-2 text-gray-500">
              Apply multiple filters to your search. Simply type and enter in the search box above, or choose from the options on the left
            </p>
  
            {filter && (
              <div className="flex justify-between mt-5 ">
                <h1 className="text-gray-500 text-sm pt-2">
                  Selected Filter: <span className="text-black font-semibold">{selectedFilter}</span>
                </h1>
                <button
                  onClick={clearFilter}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>
  
          {/* Render filtered jobs */}
          {filter
            ? selectedFilterJobs.map((job, index) => <Card key={index} job={job} />)
            : filteredJobs.map((job, index) => <Card key={index} job={job} />)}
        </main>
      </div>
    );
  };
  
  export default JobsPage;
  
