import React from "react";
import FaqList from "../Faqs/FaqList";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import avatar from "../assets/avatar-icon.png";
import { HiStar } from "react-icons/hi";
import { Footer } from "../Pages";

const AlumniGallary = () => {
  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="w-full mt-[10px]">
            <h2 className="heading text-center">
              Most Questions asked by our BeLoved Students
            </h2>
            <FaqList />
          </div>
        </div>
        <section>
          <div className="conatiner">
            <div>
              <h1 className=" text-center heading mb-[20px]">
                Our Student Reviews
              </h1>
            </div>
            <div className="mt-[5px] md:mt-[5px] ">
              <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="py-[30px] px-5 rounded-3">
                    <div className="flex items-center gap-[13px]">
                      <img src={avatar} alt="" />

                      <div>
                        <h4 className="text-[18px] leading-[25px] font-semibold text-headingColor ">
                          Manohar
                        </h4>
                        <div className="flex items-center gap-[2px]">
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className="w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] leading-7 mt-4 text-textColor font-[400] ">
                      this the best collage, placements are good and teacher are
                      super i enjoyed a lot here.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="py-[30px] px-5 rounded-3">
                    <div className="flex items-center gap-[13px]">
                      <img src={avatar} alt="" />

                      <div>
                        <h4 className="text-[18px] leading-[25px] font-semibold text-headingColor ">
                          Varsha
                        </h4>
                        <div className="flex items-center gap-[2px]">
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className="w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] leading-7 mt-4 text-textColor font-[400] ">
                      this is the best collage, placements are good and teacher
                      are super i enjoyed a lot here.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="py-[30px] px-5 rounded-3">
                    <div className="flex items-center gap-[13px]">
                      <img src={avatar} alt="" />

                      <div>
                        <h4 className="text-[18px] leading-[25px] font-semibold text-headingColor ">
                          Sreshta
                        </h4>
                        <div className="flex items-center gap-[2px]">
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className="w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] leading-7 mt-4 text-textColor font-[400] ">
                      this is the best collage, placements are good and teacher
                      are super i enjoyed a lot here.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="py-[30px] px-5 rounded-3">
                    <div className="flex items-center gap-[13px]">
                      <img src={avatar} alt="" />

                      <div>
                        <h4 className="text-[18px] leading-[25px] font-semibold text-headingColor ">
                          Sujeeth
                        </h4>
                        <div className="flex items-center gap-[2px]">
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className="w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] leading-7 mt-4 text-textColor font-[400] ">
                      this is the best collage, placements are good and teacher
                      are super i enjoyed a lot here.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="py-[30px] px-5 rounded-3">
                    <div className="flex items-center gap-[13px]">
                      <img src={avatar} alt="" />

                      <div>
                        <h4 className="text-[18px] leading-[25px] font-semibold text-headingColor ">
                          DivyaSri
                        </h4>
                        <div className="flex items-center gap-[2px]">
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className="w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] leading-7 mt-4 text-textColor font-[400] ">
                      this is the best collage, placements are good and teacher
                      are super i enjoyed a lot here.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="py-[30px] px-5 rounded-3">
                    <div className="flex items-center gap-[13px]">
                      <img src={avatar} alt="" />

                      <div>
                        <h4 className="text-[18px] leading-[25px] font-semibold text-headingColor ">
                          vani
                        </h4>
                        <div className="flex items-center gap-[2px]">
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                          <HiStar className="w-[18px] h-5" />
                          <HiStar className=" w-[18px] h-5" />
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] leading-7 mt-4 text-textColor font-[400] ">
                      this is the best collage, placements are good and teacher
                      are super i enjoyed a lot here.
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
              
            </div>
          </div>
        </section>
      </div>
      
    </div>
  );
};

export default AlumniGallary;
