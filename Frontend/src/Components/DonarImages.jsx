import React from 'react';
import donar1 from '../assets/img1.jpg'
import donar2 from '../assets/img2_1.jpg'
import donar3 from '../assets/img3.jpg'
import donar4 from '../assets/img4_1.jpg'
import donar5 from '../assets/img5.jpg'
import donar6 from '../assets/img6.jpg' 
const DonarImages = () => {
  return (
    <>
 <div className='m-6'> <h1 className=" text-3xl md:text-5xl  font-bold justify-center text-center drop-shadow-md hover:drop-shadow-x transition-all duration-300 ease-in-out transform hover:scale-110 font-serif ">Philanthropists</h1></div>
    <div className="flex overflow-hidden space-x-16 group">
     
      <div className="flex space-x-16 animate-loop-scroll group-hover:paused">
        <img src={donar1} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar2} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar3} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar4} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar5} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar6} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
      </div>
      <div className="flex space-x-16 animate-loop-scroll group-hover:paused" aria-hidden="true">
      <img src={donar1} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar2} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar3} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar4} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar5} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        <img src={donar6} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
      </div>
    </div>
  </>
  );
}

export default DonarImages;
