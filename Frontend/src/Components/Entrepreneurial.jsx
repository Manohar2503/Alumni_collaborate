import { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
function DonationCard({ donate }) {
  return (
    <div className="w-[250px] h-[250px] border-solid bg-[#fcd34d] flex flex-col items-center justify-center space-y-2 p-4 transition-transform duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-2xl">
      <div className="text-center transition-transform duration-300 ease-in-out hover:-translate-y-1">
        <h1 className="text-[20px]">{donate.ideaTitle}</h1>
        <p className="text-[15px] mt-2">
          {donate.description || 'Click here to edit the text and include the information you would like to feature.'}
        </p>
      </div>
      <div className="flex items-center justify-center text-[20px] mt-2 transition-transform duration-300 ease-in-out hover:-translate-y-1">
        <span className="text-gray-700"></span>
        <Link
          to={{
            pathname: '/startupdetails',
          }}
          state={{ donate }}
          className="text-blue-500 hover:text-blue-700"
        >
          <span className="text-gray-900 ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}

const Entrepreneurial = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/startup`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result.data.reverse());
        }
      } catch (error) {
        alert('Error fetching data: ' + error.message);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <div>
        <h1 className="md:text-[80px] font-bold justify-center text-center drop-shadow-md hover:drop-shadow-x">
          Entrepreneurial Ideas
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ml-6 gap-2 mt-8 p-4">
        {data.map((donate, index) => (
          <DonationCard key={index} donate={donate} />
        ))}
      </div>
    </div>
  );
};

export default Entrepreneurial;
