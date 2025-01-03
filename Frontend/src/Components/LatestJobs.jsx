import React from 'react';
import { JobsDetails } from '../assets/data/JobsDetails';

const LatestJobs = () => {
  function JobsCard({jobs}){
    return(
      <div >
           <div className='bg-white drop-shadow-md m-2 p-4 rounded-lg hover:drop-shadow-xl'>
      <div >
        <h3 className="border border-gray-300 w-[50%] rounded-md pl-2">Actively hiring</h3>
      </div>
      <div >
        <h2 className='my-2 font-bold'>{jobs.role}</h2>
        <h3 className='my-2'>{jobs.company}</h3>
        <div>
          <div><hr className="border-t-2 border-gray-300 w-full my-4" />
          </div>
          <div className='flex items-center my-3'>
            <span className="material-symbols-outlined ">location_on</span>
            <h3>{jobs.location}</h3>
          </div>
          <div className='flex'>
          <span class="material-symbols-outlined text-[20px] mx-2">
              payments
          </span>
              <h3 className=''><span class="material-symbols-outlined text-[16px]">
  currency_rupee
</span>
 {jobs.salary}</h3>
          </div>
          <div className="flex justify-between items-center mt-14">
  <div className="left-content bg-gray-300 px-2 rounded-lg">
    <h3>Jobs</h3>
  </div>
  <div className="right-content text-[#0ea5e9] hover:text-[#38bdf8]">
    View Details
  </div>
</div>

        </div>
      </div>
    </div>
      </div>
    )
  }
  return (
    <div>
    <div className='flex justify-center space-x-4 mt-8'>
      {JobsDetails.map((jobs)=>(
        <JobsCard jobs={jobs}/>
      ))}
    </div>
   </div>
  );
}

export default LatestJobs;
