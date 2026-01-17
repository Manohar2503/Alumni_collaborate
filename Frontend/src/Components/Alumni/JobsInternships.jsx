import React, { useState} from 'react'
import JobsResources from './JobsResources';

const JobsInternships = () => {
    const [activeTab, setActiveTab]=useState("");
    const [startups, setStartups]=useState([]);
    const [salary, setSalary]=useState([]);

    const handleActiveTab=()=>{
        setActiveTab("internships");
    }
  return (
    <div>
      <div>
        <button className='p-4 color-gray-200 hover:text-blue-600' onClick={handleActiveTab} id="jobnotifations">Jobs Notifications</button>
      <button className='p-4 color-gray-200 hover:text-blue-600' onClick={handleActiveTab} id="internships">Internships</button>
      <button className='p-4 color-gray-200 hover:text-blue-600' onClick={handleActiveTab} id="blogs">Blogs</button>
      </div>
      <div>
        {activeTab && <JobsResources page={activeTab}/>}
      </div>
    </div>
  )
}

export default JobsInternships
