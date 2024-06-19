import React from "react";
import { footerAPI} from '../../data/data' 
import SocialIcons from "../reusable/SocialIcons";

const Footer = () => {
  return (
    <div>
      <div className="bg-theme text-white text-sm">
        <div className="flex xsm:flex-col sm:flex-col py-10 px-20 xsm:px-1 sm:px-2 md:px-2 lg:px-10 gap-7 justify-between flex-wrap">
          <div>
            <p className="font-bold">{footerAPI?.titles[0]?.title}</p>
            <div>
              {footerAPI?.links[0]?.map((item, i) => (
                <p className="my-1 cursor-pointer hover:underline" key={i}>
                  {item.link}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold">{footerAPI?.titles[1]?.title}</p>
            <div>
              {footerAPI?.links[1]?.map((item, i) => (
                <p className="my-1 cursor-pointer hover:underline" key={i}>
                  {item.link}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold">{footerAPI?.titles[2]?.title}</p>
            <div>
              {footerAPI?.links[2]?.map((item, i) => (
                <p className="my-1 cursor-pointer hover:underline" key={i}>
                  {item.link}
                </p>
              ))}
            </div>
          </div>

          <div>
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
