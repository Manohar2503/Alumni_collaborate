import React from "react";
import pic3 from "../assets/pic3.jpeg";

import Slider from "../Components/Slider";
import About from "../Components/About";
import HomeEvent from "../Components/HomeEvent";
import EventsHome from "../Components/EventsHome";
import AlumniGallary from "../Components/AlumniGallary";
import DonarImages from "../Components/DonarImages";
import AbroadPage from "../Components/AbroadPage";

const Body = () => {
  return (
    <>
      <div className="w-full bg-[f2f4f6] overflow-x-hidden">
        <div className="cusShadow relative">
          <img
            className="w-full h-[600px] md:h-[900px] lg:h-full object-cover rounded-xl ring-4 ring-white"
            src={pic3}
            alt="VVIT"
          />

          <div
            className="absolute inset-0 flex items-center justify-center 
                       text-center text-white bg-opacity-50 bg-black p-4 
                       animate-slideUp"
          >
            <div className="lg:w-[570px]">
              <h1 className="text-[10px] md:leading-[46px] md:text-headingColor md:font-[800] md:text-[40px] md:leading-[50px]">
                Empowering Minds, Shaping Futures. Discover excellence at our
                university today!
              </h1>
              <p className="text__para mt-4">
                Unlock your potential with our world-class education and vibrant
                campus community. Our university is dedicated to providing a
                transformative learning experience, fostering innovation, and
                nurturing future leaders. Join us to excel in your academic
                journey and make a lasting impact on the world.
              </p>
            </div>
          </div>
        </div>

        <div className="my-8">
          <Slider />
        </div>
        <About />
        <HomeEvent />
      {/* <EventsHome /> */ }
        <DonarImages />
        <AbroadPage />
        <AlumniGallary />
      </div>
    </>
  );
};

export default Body;
