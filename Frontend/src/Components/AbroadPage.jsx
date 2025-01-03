import React from 'react'

const AbroadPage = () => {
  return (
    <div className='md:flex bg-[#172554] text-white mt-[80px] p-20 h-full'>
      <div className='md:mr-[100px]'>
      <h1 className=" text-4xl md:text-6xl font-bold justify-center text-center drop-shadow-md hover:drop-shadow-x my-[20px]">Abroad</h1>
      <h1 className=" text-4xl md:text-6xl font-bold justify-center text-center drop-shadow-md hover:drop-shadow-x my-[20px]">Studies </h1>
      </div>
      <div className='md:mt-[40px]'>
        
        <h1 className='text-lg justify-center text-center'>
        Welcome visitors to your site with a short, engaging introduction.Plan your abroad studies through this page go and get more information</h1>
        <div className='justify-center text-center mt-6 '>
        <button className='bg-white text-black w-full py-4 hover:bg-black hover:text-white md:py-[10px] md:w-[25%] md:hover:bd-black md:hover:text-white'>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default AbroadPage
