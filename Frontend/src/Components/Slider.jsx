import React from 'react'
import pic3 from '../assets/pic3.jpeg'
import pic4 from '../assets/pic4.png'
import pic5 from '../assets/pic5.jpg'
import pic6 from '../assets/pic6.png'
import img1 from '../assets/vvit_google.webp';
import img2 from '../assets/vvit_students.jpg'

const Slider = () => {
  return (
    <>
      <div className="flex overflow-hidden space-x-16 group">
        <div className="flex space-x-16 animate-loop-scroll group-hover:paused">
          <img src={pic3} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
          <img src={img1} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
          <img src={img2} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
          <img src={pic4} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        </div>
        <div className="flex space-x-16 animate-loop-scroll group-hover:paused" aria-hidden="true">
          <img src={pic3} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
          <img src={img1} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
          <img src={img2} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
          <img src={pic4} alt="" className="h-[300px] max-w-none px-[10px] rounded-2xl overflow-hidden" />
        </div>
      </div>
    </>
  );
};

export default Slider;
