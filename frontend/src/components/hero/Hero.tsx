import React from "react";

import { heroapi } from '../../data/data'
import HomeNavbar from "../navbar/HomeNavbar";


const Hero = () => {
  return (
    <>
      <div className="relative bg-theme clip-path xsm:h-[63vh] sm:h-[65vh] lg:h-[70vh] h-[70vh]">
        <HomeNavbar />
        <div className="text-center justify-center">
          <div className="text-lg md:text-5xl font-extrabold text-slate-200 drop-shadow-sm filter xsm:text-2xl text-center align-center items-center sm:mt-1">
            <p className="">{heroapi.title}</p>
            <p className="">{heroapi.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-10 xsm:mx-2 sm:mx-5 md:mx-5 sm:mt-[-300px] xsm:mt-[-300px] mt-[-250px]">
        <div className="left-0 cursor-pointer z-10">
          {heroapi.videos?.map((item: any, i) => (
            <div className="my-3" key={i}>
              <img
                className="w-20 h-20 xsm:w-12 xsm:h-12 rounded-lg shadow-xl hover:border-2 "
                src={item.imgsrc}
                alt={item.icon}
              />
            </div>
          ))}
        </div>

        <div className="right-0">
          {heroapi.sociallinks?.map((item, i) => (
            <div className="my-3 cursor-pointer" key={i}>
              <img
                className="w-8 mt-[2rem] h-8 relative object-fill xsm:w-4 xsm:h-4"
                src={item.icon}
                alt={item.icon}
              />
            </div>
          ))}
        </div>
      </div>

      
      <div className="flex justify-center text-center items-center relative">
        <img
          width={600}
          height={300}
          src={heroapi.img}
          className="w-auto h-[40vh] lg:h-[33vh] md:h-[30vh] sm:h-[21vh] xsm:h-[19vh] 
          transitions-theme -rotate-[25deg] hover:rotate-0 cursor-pointer 
          object-fill mt-[-150px] sm:mt-[-100px]"
          alt="hero-footer"
        />
      </div>
    </>
  );
};

export default Hero;
