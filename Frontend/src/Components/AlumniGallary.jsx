import React, { useState, useEffect } from "react";
import FaqList from "../Faqs/FaqList";
import axios from "axios";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import avatar from "../assets/avatar-icon.png";
import { HiStar } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi";

import { Footer } from "../Pages";

const AlumniGallary = () => {
  const [reviews, setReviews] = useState([]); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

        const reviewRes = await axios.get(`${baseUrl}/users/getReviews`);
        setReviews(reviewRes.data.data);



      } catch (err) {
        console.error(err);
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

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
              <h1 className="text-center heading mb-[20px]">
                Our Student Reviews
              </h1>
            </div>

            <div className="mt-[5px] md:mt-[5px]">
              <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 0 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
              >
                {reviews.length > 0 &&
                  reviews.map((item) => (
                    <SwiperSlide key={item._id}>
                      <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                          <img
  src={item.user?.profileImage || avatar}
  alt="profile"
  className="w-12 h-12 rounded-full object-cover"
/>


                          <div>
                            <h4 className="text-[18px] leading-[25px] font-semibold text-headingColor">
                              {item.user?.name || "Anonymous"}
                            </h4>

                            <div className="flex items-center gap-[2px]">
  {[...Array(5)].map((_, index) => (
    index < item.stars ? (
      <HiStar
        key={index}
        className="w-[18px] h-5 text-yellow-400"
      />
    ) : (
      <HiOutlineStar
        key={index}
        className="w-[18px] h-5 text-gray-300"
      />
    )
  ))}
</div>

                          </div>
                        </div>

                        <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                          {item.review}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlumniGallary;
