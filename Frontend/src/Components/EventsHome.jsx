import React from "react";
import img from "../assets/alumni_reg.png";
import mentor from "../assets/mentorship.jpg";
import { Link } from "react-router-dom";

const EventsHome = () => {
  return (
    <>
      <div className="mt-[20px]">
        <div className="flex">
          <div className="w-1/2 h-full">
            <Link to="/login">
              <img
                src={img}
                alt="Alumni Registration"
                className="rounded-tl-lg "
              />
            </Link>
          </div>
          <div className="bg-blue-700 w-full rounded-tr-lg ">
            <h1 className="text-[2rem] font-extrabold pl-[20px] pt-[20px] text-white">
              {" "}
              Jobs
            </h1>
            <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>

            {/* Job Listings */}
            <Link to="/body">
              <div className="hover:bg-blue-500">
                <div className="flex justify-between">
                  <h3 className="pt-[10px] pl-[20px] text-[18px] font-medium text-white">
                    Associate Developer
                  </h3>
                  <p className="pt-[10px] pr-[20px] pl-[20px] text-[18px] font-light opacity-[70%] text-white">
                    23 Hours ago
                  </p>
                </div>
                <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>
              </div>
            </Link>

            <Link to="/body">
              <div className="hover:bg-blue-500">
                <div className="flex justify-between">
                  <h3 className="pt-[10px] pl-[20px] text-[18px] font-medium text-white">
                    FullStack Developer
                  </h3>
                  <p className="pt-[10px] pr-[20px] pl-[20px] text-[18px] font-light opacity-[70%] text-white">
                    23 Hours ago
                  </p>
                </div>
                <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>
              </div>
            </Link>

            <Link to="/body">
              <div className="hover:bg-blue-500">
                <div className="flex justify-between">
                  <h3 className="pt-[10px] pl-[20px] text-[18px] font-medium text-white">
                    JAVA Developer
                  </h3>
                  <p className="pt-[10px] pr-[20px] pl-[20px] text-[18px] font-light opacity-[70%] text-white">
                    23 Hours ago
                  </p>
                </div>
                <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>
              </div>
            </Link>

            <Link to="/body">
              <div className="hover:bg-blue-500">
                <div className="flex justify-between">
                  <h3 className="pt-[10px] pl-[20px] text-[18px] font-medium text-white">
                    MERN Developer
                  </h3>
                  <p className="pt-[10px] pr-[20px] pl-[20px] text-[18px] font-light opacity-[70%] text-white">
                    23 Hours ago
                  </p>
                </div>
                <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>
              </div>
            </Link>

            {/* Know More Button Aligned to Right */}
            <div className="flex justify-end pr-4 pt-2">
              <Link to="/events">
                <button className="text-white bg-black hover:bg-blue-600 font-bold py-2 px-4 rounded-full">
                  Know more -&gt;
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <Link to="/alumni">
            <img
              src={mentor}
              alt="Mentorship"
              className="w-full h-[300px] object-cover"
            />
            {/* Text on Image */}
            <div className="absolute top-[40%] right-[30%] transform -translate-y-1/2 text-white  font-bold">
              <h1 className="text-[46px] opacity-60">Be a </h1>
              <h1 className=" pl-[25px] text-[46px] font-bold"> Mentor</h1>
            </div>
          </Link>
        </div>

        <div className="flex">
          <div className="bg-blue-700 w-full h-[300px]">
            <h1 className="text-[2rem] font-light pl-[20px] pt-[20px] text-white">
              {" "}
              Newsroom
            </h1>
            <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>
            <Link to="/body">
              <div className="hover:bg-blue-500">
                <div className="flex justify-between">
                  <h3 className="pt-[10px] pl-[20px] text-[18px] font-medium text-white">
                    Alumni Meet 2024
                  </h3>
                  <p className="pt-[10px] pr-[20px] pl-[20px] text-[18px] font-light opacity-[70%] text-white">
                    17 Aug 2024
                  </p>
                </div>
                <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>
              </div>
            </Link>
            <Link to="/body">
              <div className="hover:bg-blue-500">
                <div className="flex justify-between">
                  <h3 className="pt-[10px] pl-[20px] text-[18px] font-medium text-white">
                    Faculty Excellence Award 2024
                  </h3>
                  <p className="pt-[10px] pr-[20px] pl-[20px] text-[18px] font-light opacity-[70%] text-white">
                    5 April 2024
                  </p>
                </div>
                <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>
              </div>
            </Link>
            <Link to="/body">
              <div className="hover:bg-blue-500">
                <div className="flex justify-between">
                  <h3 className="pt-[10px] pl-[20px] text-[18px] font-medium text-white">
                    50th National annual convention
                  </h3>
                  <p className="pt-[10px] pr-[20px] pl-[20px] text-[18px] font-light opacity-[70%] text-white">
                    4 Feb 2024
                  </p>
                </div>
                <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>
              </div>
            </Link>
            <div className="flex justify-end pr-4 pt-2">
              <Link to="/events">
                <button className="text-white bg-black hover:bg-blue-600 font-bold py-2 px-4 rounded-full">
                  Know more -&gt;
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-blue-600 w-[60%]">
            <h1 className="text-[2rem] font-light pl-[20px] pt-[20px] text-white">
              {" "}
              Events
            </h1>
            <span className="block w-full bg-slate-300 h-[1px] mt-[10px]"></span>
            <Link to="/events">
              <div className=" hover:bg-blue-500">
                <div className=" text-white p-4 w-64 ">
                  {/* Top Text ("PAST") */}
                  <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">
                    Past
                  </p>

                  {/* Flex container for Date and Event Name */}
                  <div className="flex items-center">
                    {/* Date Section */}
                    <div className="flex flex-col items-center pr-4 border-r border-white">
                      <span className="text-lg">Feb</span>
                      <span className="text-3xl font-bold">14</span>
                    </div>
                    {/* Event Name */}
                    <div className="pl-4">
                      <h1 className="text-xl font-semibold">College Fest</h1>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex justify-end pr-4 pt-2">
              <Link to="/events">
                <button className="text-white bg-black hover:bg-blue-600 font-bold py-2 px-4 rounded-full">
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
