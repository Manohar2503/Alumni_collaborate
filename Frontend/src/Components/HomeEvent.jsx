import React from "react";

const HomeEvent = () => {
  return (
    <div className="mt-[20px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-[5px]">
        <div className="relative h-[150px] rounded-lg flex items-center justify-center border-2 border-black cursor-pointer overflow-hidden">
          <div className="absolute inset-0 hover:bg-[#a5f3fc]  transition-all duration-300 hover:opacity-[80%] hover:backdrop-blur-md" />
          <div className="flex flex-col z-10 text-center ">
            <h1 className="heading">44000+</h1>
            <p className="font-semibold">Alumni</p>
          </div>
        </div>

        <div className="relative h-[150px] rounded-lg flex items-center justify-center border-2 border-black cursor-pointer overflow-hidden">
          <div className="absolute inset-0 hover:bg-[#a5f3fc]  transition-all duration-300 hover:opacity-[80%] hover:backdrop-blur-md" />
          <div className="flex flex-col z-10 text-center ">
            <h1 className="heading">33184</h1>
            <p className="font-semibold">On-Campus Alumni</p>
          </div>
        </div>

        <div className="relative h-[150px] rounded-lg flex items-center justify-center border-2 border-black cursor-pointer overflow-hidden">
          <div className="absolute inset-0 hover:bg-[#a5f3fc]  transition-all duration-300 hover:opacity-[80%] hover:backdrop-blur-md" />
          <div className="flex flex-col z-10 text-center ">
            <h1 className="heading">11284</h1>
            <p className="font-semibold">WILP Alumni</p>
          </div>
        </div>

        <div className="relative h-[150px] rounded-lg flex items-center justify-center border-2 border-black cursor-pointer overflow-hidden">
          <div className="absolute inset-0 hover:bg-[#a5f3fc]  transition-all duration-300 hover:opacity-[80%] hover:backdrop-blur-md" />
          <div className="flex flex-col z-10 text-center ">
            <h1 className="heading">6400+</h1>
            <p className="font-semibold">Founders/Cofounders</p>
          </div>
        </div>

        <div className="relative h-[150px] rounded-lg flex items-center justify-center border-2 border-black cursor-pointer overflow-hidden">
          <div className="absolute inset-0 hover:bg-[#a5f3fc]  transition-all duration-300 hover:opacity-[80%] hover:backdrop-blur-md" />
          <div className="flex flex-col z-10 text-center ">
            <h1 className="heading">5400+</h1>
            <p className="font-semibold">CEOs</p>
          </div>
        </div>

        <div className="relative h-[150px] rounded-lg flex items-center justify-center border-2 border-black cursor-pointer overflow-hidden">
          <div className="absolute inset-0 hover:bg-[#a5f3fc]  transition-all duration-300 hover:opacity-[80%] hover:backdrop-blur-md" />
          <div className="flex flex-col z-10 text-center ">
            <h1 className="heading">40+</h1>
            <p className="font-semibold">Startups</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEvent;
