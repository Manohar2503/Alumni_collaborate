import React from "react";
import img from "../assets/alumni_reg.png";
import mentor from "../assets/mentorship.jpg";
import { Link } from "react-router-dom";

const EventsHome = () => {
  return (
    <>
      <div className="mt-5 w-full px-2 sm:px-4 md:px-6">
        {/* ======================= JOBS SECTION ======================= */}
        <div className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-md">
          
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <Link to="/login">
              <img
                src={img}
                alt="Alumni Registration"
                className="w-full h-[220px] sm:h-[280px] md:h-full object-cover"
              />
            </Link>
          </div>

          {/* Right Jobs */}
          <div className="bg-blue-700 w-full md:w-1/2">
            <h1 className="text-[22px] sm:text-[28px] font-extrabold px-4 pt-4 text-white">
              Jobs
            </h1>

            <span className="block w-full bg-slate-300 h-[1px] mt-3"></span>

            {/* Job Listings */}
            {[
              { title: "Associate Developer", time: "23 Hours ago" },
              { title: "FullStack Developer", time: "23 Hours ago" },
              { title: "JAVA Developer", time: "23 Hours ago" },
              { title: "MERN Developer", time: "23 Hours ago" },
            ].map((job, idx) => (
              <Link to="/body" key={idx}>
                <div className="hover:bg-blue-500 transition">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 gap-1">
                    <h3 className="text-[15px] sm:text-[18px] font-medium text-white">
                      {job.title}
                    </h3>
                    <p className="text-[12px] sm:text-[16px] font-light opacity-70 text-white">
                      {job.time}
                    </p>
                  </div>
                  <span className="block w-full bg-slate-300 h-[1px]"></span>
                </div>
              </Link>
            ))}

            {/* Know More */}
            <div className="flex justify-end px-4 py-3">
              <Link to="/events">
                <button className="text-white bg-black hover:bg-blue-600 font-bold py-2 px-4 rounded-full text-[12px] sm:text-[14px] transition">
                  Know more -&gt;
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ======================= MENTORSHIP IMAGE ======================= */}
        <div className="relative w-full mt-6 rounded-lg overflow-hidden shadow-md">
          <Link to="/alumni">
            <img
              src={mentor}
              alt="Mentorship"
              className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover"
            />

            {/* Text on Image */}
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
              <div className="text-center">
                <h1 className="text-[26px] sm:text-[42px] opacity-70">Be a</h1>
                <h1 className="text-[26px] sm:text-[42px] font-extrabold">
                  Mentor
                </h1>
              </div>
            </div>
          </Link>
        </div>

        {/* ======================= NEWSROOM + EVENTS ======================= */}
        <div className="flex flex-col md:flex-row mt-6 gap-4">
          
          {/* Newsroom */}
          <div className="bg-blue-700 w-full md:w-[65%] rounded-lg overflow-hidden shadow-md">
            <h1 className="text-[22px] sm:text-[28px] font-light px-4 pt-4 text-white">
              Newsroom
            </h1>
            <span className="block w-full bg-slate-300 h-[1px] mt-3"></span>

            {[
              { title: "Alumni Meet 2024", date: "17 Aug 2024" },
              { title: "Faculty Excellence Award 2024", date: "5 April 2024" },
              { title: "50th National annual convention", date: "4 Feb 2024" },
            ].map((news, idx) => (
              <Link to="/body" key={idx}>
                <div className="hover:bg-blue-500 transition">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 gap-1">
                    <h3 className="text-[15px] sm:text-[18px] font-medium text-white">
                      {news.title}
                    </h3>
                    <p className="text-[12px] sm:text-[16px] font-light opacity-70 text-white">
                      {news.date}
                    </p>
                  </div>
                  <span className="block w-full bg-slate-300 h-[1px]"></span>
                </div>
              </Link>
            ))}

            <div className="flex justify-end px-4 py-3">
              <Link to="/events">
                <button className="text-white bg-black hover:bg-blue-600 font-bold py-2 px-4 rounded-full text-[12px] sm:text-[14px] transition">
                  Know more -&gt;
                </button>
              </Link>
            </div>
          </div>

          {/* Events */}
          <div className="bg-blue-600 w-full md:w-[35%] rounded-lg overflow-hidden shadow-md">
            <h1 className="text-[22px] sm:text-[28px] font-light px-4 pt-4 text-white">
              Events
            </h1>
            <span className="block w-full bg-slate-300 h-[1px] mt-3"></span>

            <Link to="/events">
              <div className="hover:bg-blue-500 transition">
                <div className="text-white p-4">
                  <p className="text-[12px] uppercase tracking-widest text-gray-200 mb-2">
                    Past
                  </p>

                  <div className="flex items-center">
                    <div className="flex flex-col items-center pr-4 border-r border-white">
                      <span className="text-[14px] sm:text-[16px]">Feb</span>
                      <span className="text-[28px] sm:text-[34px] font-bold">
                        14
                      </span>
                    </div>

                    <div className="pl-4">
                      <h1 className="text-[18px] sm:text-[20px] font-semibold">
                        College Fest
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex justify-end px-4 py-3">
              <Link to="/events">
                <button className="text-white bg-black hover:bg-blue-600 font-bold py-2 px-4 rounded-full text-[12px] sm:text-[14px] transition">
                  Know more -&gt;
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsHome;
