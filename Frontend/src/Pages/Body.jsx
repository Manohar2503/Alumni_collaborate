import React from "react";
import pic3 from "../assets/pic3.jpeg";
import Slider from "../Components/Slider";
import HomeEvent from "../Components/HomeEvent";
import EventsHome from "../Components/EventsHome";
import AlumniGallary from "../Components/AlumniGallary";
import DonarImages from "../Components/DonarImages";
import AbroadPage from "../Components/AbroadPage";
import Header from "../Pages/Header";

const Body = () => {
  return (
    <>
      {/* ✅ Header only on Home page */}
      <Header />

      <div className="w-full bg-[#f2f4f6] overflow-x-hidden">
        {/* ✅ Hero Section */}
        <div className="cusShadow relative px-2 sm:px-4 md:px-6 pt-2">
          <img
            className="w-full h-[500px] sm:h-[400px] md:h-[500px] lg:h-[650px] object-cover rounded-xl ring-4 ring-white"
            src={pic3}
            alt="VVIT"
          />

          {/* ✅ Animated Overlay */}
          <div className="absolute inset-0 flex items-center justify-center text-center text-white bg-black/50 rounded-xl px-3 sm:px-6 animate-slideUp">
            <div className="max-w-[700px]">
              <h1 className="text-[16px] sm:text-[22px] md:text-[36px] lg:text-[42px] font-extrabold leading-snug md:leading-tight">
                Empowering Minds, Shaping Futures. Discover excellence at our
                university today!
              </h1>

              <p className="mt-3 sm:mt-4 text-[11px] sm:text-[13px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-90">
                Unlock your potential with our world-class education and vibrant
                campus community. Our university is dedicated to providing a
                transformative learning experience, fostering innovation, and
                nurturing future leaders. Join us to excel in your academic
                journey and make a lasting impact on the world.
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Slider */}
        <div className="my-6 sm:my-8 px-2 sm:px-4 md:px-6">
          <Slider />
        </div>

        {/* ✅ Remaining Sections */}
        <div className="px-2 sm:px-4 md:px-6 space-y-6 sm:space-y-8">
          <HomeEvent />
          <EventsHome />
          <DonarImages />
          <AbroadPage />
          <AlumniGallary />
        </div>
      </div>
    </>
  );
};

export default Body;
