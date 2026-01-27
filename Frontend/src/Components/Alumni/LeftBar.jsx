import React, {useState, useEffect} from 'react'
import JobsInternshipsPosts from "../../assets/data/jobsinternshipsposts.json"
import axios from 'axios';
const LeftBar = ({page, filters, setFilters}) => {
  const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const url =
        page === "jobs"
          ? "http://localhost:5001/api/oppurtunities/getJobs"
          : "http://localhost:5001/api/oppurtunities/getInternships";

      const response = await axios.get(url);

      // 🔑 Backend returns ARRAY directly
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(
        "API Error:",
        error.response?.data || error.message
      );
      setData([]);
    }
  };

  fetchData();
}, [page]);



  const companies=[...new Set(data.map(item=>item.company))];

  const categories=[...new Set(data.map(item=>item.category))];
  const blogTags=[...new Set(data.map(item=>item.tags).flat())];

  
  // const [expanded, setExpanded]=useState(false);
  //need to filter based on techstack salaryRange and keywords through input
  const handleCompaniesChange=(e)=>{
    const value=e.target.value;
    setFilters(prev=>({
      ...prev, selectedCompanies: e.target.checked 
         ? [...prev.selectedCompanies, value]
         : prev.selectedCompanies.filter(item=>item!==value)
    }))
    
  }

 
 
  const handleCategoriesChange=(e)=>{
    const value=e.target.value;
    setFilters(prev=>({
      ...prev, selectedCategories:e.target.checked ?
      [...prev.selectedCategories, value]
      : prev.selectedCategories.filter(item=>item!==value)
    }))
  }

  const handleBlogTagsChange=(e)=>{
    const value=e.target.value;
    setFilters(prev=>({
      ...prev, selectedBlogTags: e.target.checked
      ? [...prev.selectedBlogTags, value]
      : prev.selectedBlogTags.filter(item=>item!==value)
    }))
  }
return (
  <div className="sticky top-20 h-screen bg-white p-5 rounded-lg">

    {/* Title */}
    <p className="text-xl font-semibold text-blue-600 mb-4">
      Filters
    </p>

    <div className="space-y-6 overflow-y-auto pr-2">

      {/* Jobs & Internships Filters */}
      {(page === "internships" || page === "jobs") && (

        <div>

          <p className="font-medium text-gray-700 mb-3">
            Select Company
          </p>

          <div className="space-y-2">

            {companies.map((item, index) => (

              <label
                key={index}
                htmlFor={item.replace(/\s/g, "")}
                className="
                  flex items-center gap-3
                  p-2 rounded-lg
                  cursor-pointer
                  hover:bg-blue-50
                  transition
                "
              >

                <input
                  type="checkbox"
                  id={item.replace(/\s/g, "")}
                  value={item}
                  checked={filters.selectedCompanies.includes(item)}
                  onChange={handleCompaniesChange}
                  className="
                    accent-blue-600
                    w-4 h-4
                    cursor-pointer
                  "
                />

                <span className="text-gray-700 text-sm">
                  {item}
                </span>

              </label>

            ))}

          </div>

        </div>

      )}

      {/* Blogs Filters */}
      {/* {page === "blogs" && (

        <div className="space-y-6">

          <div>

            <p className="font-medium text-gray-700 mb-3">
              Select Category
            </p>

            <div className="space-y-2">

              {categories.map((item, index) => (

                <label
                  key={index}
                  htmlFor={item}
                  className="
                    flex items-center gap-3
                    p-2 rounded-lg
                    cursor-pointer
                    hover:bg-blue-50
                    transition
                  "
                >

                  <input
                    type="checkbox"
                    id={item}
                    value={item}
                    checked={filters.selectedCategories.includes(item)}
                    onChange={handleCategoriesChange}
                    className="accent-blue-600 w-4 h-4"
                  />

                  <span className="text-gray-700 text-sm">
                    {item}
                  </span>

                </label>

              ))}

            </div>

          </div>

          <div>

            <p className="font-medium text-gray-700 mb-3">
              Select Tags
            </p>

            <div className="space-y-2">

              {blogTags.map((item, index) => (

                <label
                  key={index}
                  htmlFor={item}
                  className="
                    flex items-center gap-3
                    p-2 rounded-lg
                    cursor-pointer
                    hover:bg-blue-50
                    transition
                  "
                >

                  <input
                    type="checkbox"
                    id={item}
                    value={item}
                    checked={filters.selectedBlogTags.includes(item)}
                    onChange={handleBlogTagsChange}
                    className="accent-blue-600 w-4 h-4"
                  />

                  <span className="text-gray-700 text-sm">
                    {item}
                  </span>

                </label>

              ))}

            </div>

          </div>

        </div>

      )} */}

    </div>

  </div>
)

}

export default LeftBar
