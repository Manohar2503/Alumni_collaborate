import React from 'react';

const DonorPayment = () => {
  return (
    <div className="flex flex-col items-center my-[80px]">
      <h1 className="text-5xl font-bold text-center drop-shadow-md hover:drop-shadow-lg mb-8">
        Donate Your Money Here!
      </h1>
      <div className="bg-gray-200 w-full flex flex-col md:flex-row items-center p-8 rounded-lg shadow-lg">
        <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-8 w-[1000%] max-w-md h-[600px]">
          <img 
            src='../src/assets/Donations.png' 
            alt="Donation illustration" 
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md h-108">
          <form className="flex flex-col space-y-4 h-full">
            <div>
              <label htmlFor="donorName" className="block text-lg font-semibold mb-1">Donor Name:</label>
              <input 
                id="donorName" 
                type="text" 
                placeholder="Enter your name" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold mb-1">Email ID:</label>
              <input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-lg font-semibold mb-1">Contact Number:</label>
              <input 
                id="contact" 
                type="tel" 
                placeholder="Enter your contact number" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-lg font-semibold mb-1">Address:</label>
              <input 
                id="address" 
                type="text" 
                placeholder="Enter your address" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-lg font-semibold mb-1">Amount:</label>
              <input 
                id="amount" 
                min="0" 
                max="1000" 
                type="number" 
                placeholder="Enter Amount" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button type="submit" className="w-full py-2  text-white font-bold bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Donate Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorPayment;
