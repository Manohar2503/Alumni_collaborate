import React, {useState} from 'react'

const Accordian = ({title, isOpen, onToggle, children}) => {
  
  return (
    <div className='border rounded-lg overflow-hidden'>
      <button onClick={onToggle}
        className='w-full p-4 flex justify-between items-center font-semibold'
        >{title}

        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}> ▼</span>
      </button>

      <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 p-4" : "max-h-0 p-0"} overflow-hidden`}>
        {children}
      </div>
    </div>
  )
}

export default Accordian
