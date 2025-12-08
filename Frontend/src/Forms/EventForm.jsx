import React from 'react'

const EventForm = () => {
  return (
    
    <div>
        <div className="w-full flex justify-center items-center">
    <div className="flex flex-col gap-6">
      <h1 className="mt-[100px] text-5xl font-bold text-gray-800">
        Wanna Conduct an Event?
      </h1>
      <h2 className=" text-center text-xl">
        Please take a moment to fill out the form.
      </h2>
    </div>
  </div>
  {/* form details */}
  <div className="flex justify-center items-center min-h-screen">
    <form className=" p-8  w-full max-w-4xl">
      <div className="flex justify-between w-full">
        {/* Left Column */}
        <div className="w-1/2 pr-4">
          <div className="mb-4">
            <label className="block text-gray-700">Event Name</label>
            <input
              type="text"
              placeholder="Event Name"
              className="w-full mt-2 p-2 border border-gray-300 "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Aim</label>
            <input
              type="text"
              placeholder="Aim"
              className="w-full mt-2 p-2 border border-gray-300 "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Number of Members</label>
            <input
              type="text"
              placeholder="No. of Members"
              className="w-full mt-2 p-2 border border-gray-300 "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email *</label>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full mt-2 p-2 border  "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Subject *</label>
            <input
              type="text"
              placeholder="Subject"
              required
              className="w-full mt-2 p-2 border  "
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2 pl-4">
          <div className="mb-4">
            <label className="block text-gray-700">
              Brief Description about your event...
            </label>
            <textarea
              rows="16"
              placeholder="Brief Description"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3  hover:bg-white hover:text-blue-600  hover:border hover:border-blue-400 transition-all duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
    </div>
  )
}

export default EventForm
