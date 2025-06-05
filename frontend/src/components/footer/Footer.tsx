import React from "react";
import { footerAPI } from '../../data/data';
import SocialIcons from "../reusable/SocialIcons";

const Footer = () => {
  return (
    <div className="bg-theme text-white">
      <div className="py-10 px-4 xl:px-20 lg:px-16 md:px-10 sm:px-6 xsm:px-4">
        {/* First Row - 3 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 xsm:grid-cols-1 gap-8 xl:gap-8 lg:gap-6 md:gap-6 sm:gap-5 xsm:gap-4 mb-8">
          <div>
            <p className="font-bold text-lg xl:text-lg lg:text-base md:text-base sm:text-base xsm:text-base mb-3">
              {footerAPI?.titles[0]?.title}
            </p>
            <div className="space-y-2">
              {footerAPI?.links[0]?.map((item, i) => (
                <p className="text-sm xl:text-sm lg:text-sm md:text-sm sm:text-xs xsm:text-xs cursor-pointer hover:underline" key={i}>
                  {item.link}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold text-lg xl:text-lg lg:text-base md:text-base sm:text-base xsm:text-base mb-3">
              {footerAPI?.titles[1]?.title}
            </p>
            <div className="space-y-2">
              {footerAPI?.links[1]?.map((item, i) => (
                <p className="text-sm xl:text-sm lg:text-sm md:text-sm sm:text-xs xsm:text-xs cursor-pointer hover:underline" key={i}>
                  {item.link}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold text-lg xl:text-lg lg:text-base md:text-base sm:text-base xsm:text-base mb-3">
              {footerAPI?.titles[2]?.title}
            </p>
            <div className="space-y-2">
              {footerAPI?.links[2]?.map((item, i) => (
                <p className="text-sm xl:text-sm lg:text-sm md:text-sm sm:text-xs xsm:text-xs cursor-pointer hover:underline" key={i}>
                  {item.link}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row - Social Icons */}
        <div className="flex justify-center mb-8">
          <SocialIcons socialLinks={""} />
        </div>

        {/* Third Row - Copyright/Additional Info */}
        <div className="text-center text-xs xl:text-xs lg:text-xs md:text-xs sm:text-xs xsm:text-xs opacity-80">
          <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <span className="cursor-pointer hover:underline">Privacy Policy</span>
            <span className="cursor-pointer hover:underline">Terms of Service</span>
            <span className="cursor-pointer hover:underline">Contact Us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;