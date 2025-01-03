import React from 'react'
import LatestJobs from '../LatestJobs'
import { Link } from 'react-router-dom'
import LatestInternships from '../LatestInternships'

const JobsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img src="../src/assets/job_poster.png" className="w-full h-[300px] object-cover" alt="Description of image" />
    <div className='my-[80px]'>
      
      <h1 className="text-6xl font-bold text-center drop-shadow-md hover:drop-shadow-xl">
        Make your dream big
      </h1>
      
    </div>
    
    <div className='bg-gray-100 py-20'>
    <div><h1 className="text-4xl  text-center justify-center">Latest Jobs</h1></div>
    <div className='my-4'>
    <ul className='flex space-x-5 justify-center item-center  '>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Work from home </li>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Part Time</li>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Engineering</li>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Design</li>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Data Science</li>
    </ul>

    </div>
      <div><LatestJobs/></div>
      <div className="relative">
  <Link to='/'><button className="absolute right-0 top-0 bg-blue-500 mt-4 text-white px-4 py-2 hover:bg-blue-600 mx-10 rounded-2xl">
    Share 
  </button></Link>
</div>


<div><h1 className="text-4xl  text-center justify-center mt-20">Latest Internships</h1></div>
    <div className='my-4'>
    <ul className='flex space-x-5 justify-center item-center  '>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Work from home </li>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Part Time</li>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Engineering</li>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Design</li>
      <li className='border border-gray-300 rounded-2xl px-2 py-1 hover:bg-[#38bdf8]'>Data Science</li>
    </ul>

    </div>
      <div><LatestInternships/></div>
      <div className="relative">
  <Link to='/'><button className="absolute right-0 top-0 bg-blue-500 mt-4 text-white px-4 py-2 hover:bg-blue-600 mx-10 rounded-2xl">
    Share 
  </button></Link>
</div>


    </div>
  </div>
  )
}

export default JobsPage
