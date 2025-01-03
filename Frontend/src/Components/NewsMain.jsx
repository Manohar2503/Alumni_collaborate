import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { newsData } from '../assets/data/NewsData';
import { Footer } from '../Pages';

function NewCard({news}) {
  const navigate = useNavigate();
  const getDetails = () => navigate("/newsdetails", { state: { news } });
  
  return (
    <div className="flex flex-wrap justify-center my-4">
      <div className="flex border border-black">
        <div className="bg-red-600 w-[450px] h-[350px] flex-shrink-0">
          <img src={news.image} className="h-full w-full object-cover" alt="" />
        </div>
        <div className="bg-white w-[450px] flex flex-col justify-between min-h-[250px]">
          <div className="mt-4 px-6">
            <h1>
              <span>logo</span> UserName
            </h1>
          </div>
          <div 
            className="px-6 mt-2 mb-auto cursor-pointer text-left text-black hover:text-[#6565e2]"
            onClick={getDetails}
          >
            <h1 className="text-2xl font-bold">
              {news.title}
            </h1>
            <p className="pt-3">
              {news.short}
            </p>
          </div>
          <hr className="border-[1px] mx-6 my-4" />
          <div className="px-6 pb-4">
            <div className="flex justify-between">
              <div>
                <span className="font-light text-sm pr-7">9 Views</span>
                <span className="font-light text-sm">0 comments</span>
              </div>
              <div>
                <span className="font-light text-sm">&#9829; 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const NewsMain = () => {
  return (
    <div className="m-0 p-0 w-full min-h-screen">
      <div className="flex justify-center my-20">
        <h1 className="text-6xl font-bold text-[#1d1d34]">LATEST NEWS</h1>
      </div>
      <div className="bg-half-color">
        <div className="h-full w-full">
          <div className="flex flex-col">
            <h1 className="text-white text-xl mb-5 text-center mt-2">
              <Link to="/newsMain">All Posts</Link>
            </h1>
            {newsData.map((news, index) => (
              <NewCard key={index} news={news} />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default NewsMain;
