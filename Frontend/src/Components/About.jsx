import React from "react";
import vm from "../assets/v&m.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-[75px]" >
      <div className="container ">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/*====about img====*/}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img
              src={vm}
              alt=""
              srcset=""
              className="h-[80%] w-full rounded-xl"
            />
          </div>

          {/*==================about content */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <div className="flex flex-col">
              <h2 className="heading">About us: </h2>
              <span className="block w-[180px] h-[2px] bg-purpleColor mt-1"></span>
              <span className="block w-[150px] h-[2px] bg-purpleColor mt-1"></span>
            </div>
            <div className="pl-[15px]">
              <h3 className="text-[30px] font-extrabold">VISION : </h3>

              <p className="text-[15px] leading-[30px] font-[400] text-textColor mt-[7px]">
                The Association aims to bring its members spread across the
                globe under one umbrella, to work in tandem with its Alma Mater
                including its faculty and current students.
              </p>
            </div>

            <div className="pl-[15px]">
              <h3 className="text-[30px] font-extrabold">MISSION : </h3>

              <p className="text-[15px] leading-[30px] font-[400] text-textColor mt-[2px]">
              AM1 aims to foster strong bonds between alumni, the college, and current students, while AM2 seeks to create a network for alumni to stay engaged with all stakeholders, adhering to ethics and legal standards.
              </p>
            </div>
            <Link to='/home'><button className="btn bg-black mt-[10px]">Know More -&gt; </button> </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
