import React from 'react'

const AddForm = () => {
  return (
    <div className="bg-[#1f2937] flex items-center justify-center min-h-screen">
      <form className="bg-white p-6 rounded-lg shadow-md text-center w-[80%] md:w-[50%]">
        <div className="m-2">
          <h5>Course Name: </h5>
          <input 
            className="placeholder:italic placeholder:text-slate-400 w-[80%] border border-slate-300 rounded-md p-2" 
            type="text" 
            placeholder="Course Name" 
          />
        </div>
        <div className="m-2">
          <h5>Department Name: </h5>
          <input 
            className="placeholder:italic placeholder:text-slate-400 w-[80%] border border-slate-300 rounded-md p-2" 
            type="text" 
            placeholder="Department" 
          />
        </div>
        <div className="m-2">
          <h5>Upload Link*: </h5>
          <input 
            className="placeholder:italic placeholder:text-slate-400 w-[80%] border border-slate-300 rounded-md p-2" 
            type="text" 
            placeholder="URL Link" 
          />
        </div>
        <div className="m-2">
          <h5>Upload File*: </h5>
          <input 
            className="placeholder:italic placeholder:text-slate-400 w-full border border-slate-300 rounded-md p-2" 
            type="file" 
            placeholder="File Upload" 
          />
        </div>
        <input  
          className="m-4 bg-[#3b82f6] w-[100px] rounded-md text-white p-2 cursor-pointer" 
          type="submit" 
        />
      </form>
    </div>
  )
}

export default AddForm
