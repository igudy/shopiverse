import { popularsales } from "../../data/data";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import toast from "react-hot-toast";
import { comingSoon } from "../../utils";

const PopularSales = () => {
  return (
    <div className="px-4">
      <p className="text-5xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl xsm:text-xl font-extrabold my-10 sm:my-6 xsm:my-4">
        {popularsales.title}
      </p>

      <div className="grid grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 xsm:grid-cols-1 gap-5 xl:gap-5 lg:gap-4 md:gap-4 sm:gap-3 xsm:gap-3">
        {popularsales?.items?.map((item) => (
          <div key={item.id} className="text-white">
            <div
              className={`relative bg-gradient-to-b ${item.color} ${item.shadow} rounded-xl py-4 px-3 transition-all duration-300 ease-in-out hover:scale-95 h-full`}
            >
              <div className="flex justify-between h-full">
                {/* Text Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="font-bold xl:text-xl lg:text-lg md:text-xl sm:text-lg xsm:text-base my-1">
                      {item.title}
                    </p>
                    <p className="text-xs xl:text-xs lg:text-xs md:text-xs sm:text-xs xsm:text-xs my-1">
                      {item.text}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex gap-2 my-2 items-center">
                      <p className="font-bold xl:text-lg lg:text-base md:text-lg sm:text-base xsm:text-base">
                        ₦{item.price}
                      </p>
                      <span className="bg-slate-200 xl:w-12 lg:w-10 md:w-12 sm:w-10 xsm:w-10 rounded-lg drop-shadow-xl text-black">
                        <p className="flex items-center justify-center xl:text-sm lg:text-xs md:text-sm sm:text-xs xsm:text-xs font-medium">
                          {item.rating} <AiFillStar className="text-yellow-500 ml-1" />
                        </p>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="border-[2px] w-7 h-6 cursor-pointer rounded-full drop-shadow-xl flex items-center justify-center"
                        onClick={comingSoon}
                      >
                        <BsFillCartCheckFill className="text-sm" />
                      </div>
                      <span 
                        className="ml-2 xl:text-sm lg:text-xs md:text-sm sm:text-xs xsm:text-xs cursor-pointer"
                        onClick={comingSoon}
                      >
                        {item.btn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt={`${item.title}`}
                    className="h-[7rem] md:h-[10rem] w-auto transition-transform duration-300 -rotate-[15deg] hover:rotate-0 cursor-pointer object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSales;