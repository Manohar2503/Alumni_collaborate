import React from 'react'
import Entrepreneurial from './Entrepreneurial'
import { Footer } from '../Pages';
import DonorPayment from './DonorPayment';
import { Link } from 'react-router-dom';
const DonationPage = () => {
  return (
    <div>
       <div className='border-2 border-black'>
       <img  className='w-full h-[400px] ' src='../src/assets/donarImage.jpeg'/>
       </div>
      <h1 className=" text-2xl md:text-5xl font-bold justify-center text-center drop-shadow-md hover:drop-shadow-x my-[80px]">Reason For Donation!</h1>
      <div class="flex items-center justify-center  m-4 h-[50%]">
      
  <div class=" w-full md:w-[50%] px-4 py-6 bg-white shadow-2xl mb-4 h-[50%] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#fca5a5]">
    <h2 class="text-2xl font-semibold mb-4">Reasons for Alumni Donate</h2>
    <ul class="text-left">
      <li><strong>Sense of Gratitude:</strong> Alumni feel thankful for their university experience.</li>
      <li><strong>Giving Back:</strong> Desire to support future students and improve educational opportunities.</li>
      <li><strong>Connection with Alma Mater:</strong> Feeling proud and connected to their university.</li>
    </ul>
  </div>
</div>


<div class="flex items-center justify-center m-4 h-[50%]">
  <div class=" w-full md:w-[50%] px-4 py-6 bg-white shadow-2xl mb-4  h-[50%] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#fdba74]">
    <h2 class="text-2xl font-semibold mb-4">Impact of Donations</h2>
    <ul class="text-left space-y-2">
      <li>Funding Scholarships Assisting students with financial need.</li>
      <li>Improving Facilities Enhancing campus infrastructure for all students.</li>
      <li>Research Support Contributing to advancements in various fields.</li>
    </ul>
  </div>
</div>

<div class="flex items-center justify-center m-4 h-[50%]">
  <div class=" w-full md:w-[50%] px-4 py-6 bg-white shadow-2xl h-[50%] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#67e8f9]">
    <h2 class="text-2xl font-semibold mb-4">Encouraging Alumni Donations</h2>
    <ul class="text-left space-y-2">
      <li>Alumni Engagement Building strong relationships with former students.</li>
      <li>Communication Providing updates on university progress and needs.</li>
      <li>Recognition Acknowledging donors' contributions and showing appreciation.</li>
    </ul>
  </div>
</div>

<Entrepreneurial/>
<div className="relative">
  <Link to='/stratup'><button className="absolute right-0 top-0 bg-blue-500 mt-4 text-white px-4 py-2 hover:bg-blue-600 rounded-2xl">
    Share your Ideas
  </button></Link>
</div>
<DonorPayment/>

    </div>
  )
}

export default DonationPage
