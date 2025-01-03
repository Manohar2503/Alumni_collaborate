import React from 'react';

const ContactPage = () => {
  return (
    <div className="   bg-[#374550]">
        <div>
        <h1 className="text-4xl p-4 font-bold justify-center text-center my-[20px] text-white">Contact Us</h1>
            <p className='text-center text-xl text-[#9599E2] p-4'>Any feedback or Suggest to our website</p>
        </div>
      <div className=' flex items-center justify-center min-h-screen'>
      <form className=" bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
        
        <label className="block text-gray-600 font-medium mb-2">Name:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          placeholder="Your Name"
        />

        <label className="block text-gray-600 font-medium mb-2">Email:</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          placeholder="Your Email"
        />

        <label className="block text-gray-600 font-medium mb-2">Message:</label>
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          placeholder="Your Message"
          rows="4"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default ContactPage;
