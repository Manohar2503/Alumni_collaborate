import React from 'react';
import careerResources from "../../assets/data/courses";

const CareerResources = () => {
  return (
    <div className='min-h-screen mx-auto px-6 py-12'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-8 text-center'>
        Choose a course to master from below
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {careerResources.careerResources.map((course) => (
          <div
            key={course.id}
            className='bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col'
          >
            <img
              src={course.image}
              alt={course.courseName}
              className='h-48 w-full object-cover'
            />
            <div className='p-4 flex-1 flex flex-col justify-between'>
              <div>
                <h4 className='font-semibold text-xl mb-2'>{course.courseName}</h4>
                <p className='text-sm text-blue-600 mb-2'>{course.timeToLearn}</p>
                <span className='text-sm bg-gray-200 border border-gray-300 rounded-lg px-2 py-1 text-gray-700'>
                  {course.category}
                </span>
              </div>
              
              {/* Start / Continue Button */}
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerResources;
