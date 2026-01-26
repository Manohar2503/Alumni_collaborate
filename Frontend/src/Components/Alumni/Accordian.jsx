import React, {useState} from 'react'

const Accordian = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50 transition"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ⌄
        </span>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[2000px] opacity-100 p-4" : "max-h-0 opacity-0 p-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordian;


