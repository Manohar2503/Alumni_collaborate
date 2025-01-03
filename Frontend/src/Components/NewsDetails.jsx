import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import pic3 from '../assets/pic3.jpeg'
import { Footer } from "../Pages";
const NewsDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const news = location.state?.news;
 const newPage = () => navigate("/newsMain");
  return (
    <>
      <div className="">
        <h1 className="ml-40 mt-10 text-xl font-light">
          <Link to="/newsMain"> All Posts</Link>
        </h1>
        <div className="flex justify-center mt-14">
          <div className="h-auto w-full mx-40  border border-black px-[100px] py-10">
            <h1>
              <span>Logo</span> &nbsp; UserName
            </h1>
            <h1 className="text-4xl font-bold mt-7">
              {news.title}
            </h1>
            <div className="mt-8 ">
              <img  src={news.image} alt="" srcset="" className="w-full" />
            </div>
            <div className="mt-7">
              <h1 className="text-2xl font-semibold">Description</h1>
              <p>
                {news.description}
              </p>
            </div>
            <hr className="border mt-10 " />
            <div className="mt-3">
              <h1 className="text-xl pt-2 pb-4">
                <span className="font-bold pr-10 hover:text-indigo-400">
                  <a href="">f</a>
                </span>
                <span className="font-bold pr-10 text-[25px] hover:text-indigo-400">
                  <a href="">x</a>
                </span>
                <span className="font-bold hover:text-indigo-400">
                  <a href="">in</a>
                </span>
              </h1>
            </div>
            <hr className="border  " />
            <div className="mt-3 px-16">
              <div className="flex justify-between">
                <div>
                  <span className="font-light text-sm pr-7">9 Views</span>
                  <span className="font-light text-sm">0 comments</span>
                </div>
                <div>
                  <span className="font-light mr-0">1 &#9829;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-[4rem] ">
          <button
            className="bg-indigo-400 font-bold   h-[40px] w-[300px] hover:bg-indigo-300"
            onClick={newPage}
          >
            See All
          </button>
        </div>
        <div className="flex justify-center my-10">
          <div className="h-auto w-full mx-40  border border-black">
            <div className="px-[80px] pt-6 mb-10">
              <h1 className="font-bold text-xl">Comments</h1>
              <hr className="border mt-5 " />
              <textarea
                rows="2"
                placeholder="Brief Description"
                className="w-full mt-5 p-2 border border-gray-300 "
              ></textarea>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default NewsDetails;