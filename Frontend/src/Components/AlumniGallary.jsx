import React from "react";
import FaqList from "../Faqs/FaqList";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import avatar from "../assets/avatar-icon.png";
import { HiStar } from "react-icons/hi";

const AlumniGallary = () => {
  const reviews = [
    { name: "Manohar", text: "This is the best college, placements are good and teachers are super. I enjoyed a lot here." },
    { name: "Varsha", text: "This is the best college, placements are good and teachers are super. I enjoyed a lot here." },
    { name: "Sreshta", text: "This is the best college, placements are good and teachers are super. I enjoyed a lot here." },
    { name: "Sujeeth", text: "This is the best college, placements are good and teachers are super. I enjoyed a lot here." },
    { name: "DivyaSri", text: "This is the best college, placements are good and teachers are super. I enjoyed a lot here." },
    { name: "Vani", text: "This is the best college, placements are good and teachers are super. I enjoyed a lot here." },
  ];

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-6">
      {/* ================= FAQ SECTION ================= */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-[18px] sm:text-[26px] md:text-[34px] font-extrabold text-gray-900">
          Most Questions asked by our BeLoved Students
        </h2>

        <div className="mt-4 sm:mt-6">
          <FaqList />
        </div>
      </div>

      {/* ================= REVIEWS SECTION ================= */}
      <div className="max-w-6xl mx-auto mt-10">
        <h1 className="text-center text-[20px] sm:text-[28px] md:text-[34px] font-extrabold text-gray-900 mb-5">
          Our Student Reviews
        </h1>

        <div className="mt-3">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={12}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 12 },
              768: { slidesPerView: 2, spaceBetween: 18 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {reviews.map((rev, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white shadow-md rounded-2xl p-5 sm:p-6 border border-gray-200">
                  {/* Top */}
                  <div className="flex items-center gap-3">
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-[45px] h-[45px] sm:w-[52px] sm:h-[52px]"
                    />

                    <div>
                      <h4 className="text-[16px] sm:text-[18px] font-semibold text-gray-900">
                        {rev.name}
                      </h4>

                      <div className="flex items-center gap-[2px] text-yellow-500">
                        <HiStar className="w-[18px] h-[18px]" />
                        <HiStar className="w-[18px] h-[18px]" />
                        <HiStar className="w-[18px] h-[18px]" />
                        <HiStar className="w-[18px] h-[18px]" />
                        <HiStar className="w-[18px] h-[18px]" />
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-[13px] sm:text-[15px] leading-relaxed mt-4 text-gray-600">
                    {rev.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default AlumniGallary;
