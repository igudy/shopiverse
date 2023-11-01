import { highlight } from "../data/data";

const Highlights = () => {
  return (
    <div className="sm:my-5 md:my-5 xsm:my-5 my-32 sm:text-center relative">
      <div className="flex flex-row sm:flex-col-reverse md:flex-col-reverse left-0 justify-between">
        <div className="basis-1/2 md:flex md:justify-center sm:flex xsm:justify-center xsm:flex sm:justify-center">
          <img
            src={highlight.img}
            className="object-fill
            w-auto h-[50vh] lg:h-[35vh] justify-center  md:h-[34vh] sm:my-3 md:my-3 sm:h-[21vh] xsm:h-[19vh] transitions-theme -rotate-[-15deg] hover:rotate-0 cursor-pointer z-20"
            alt={highlight.img}
          />
        </div>
        <div className="basis-1/2">
          <div className="relative text-xl sm:text-md xsm:text-md sm:text-center md:text-center right-0 mt-4 text-right">
            <p className="font-bold text-blue-600 sm:text-2xl md:text-3xl xsm:text-xl xl:text-6xl text-6xl">
              {highlight.heading}
            </p>
            <p className="font-extrabold text-slate-900 sm:text-xl xsm:text-xl md:text-2xl xl:text-6xl lg:text-4xl text-5xl drop-shadow-2xl">
              {highlight.title}
            </p>
            <p className="text-slate-800 text-md my-1 sm:text-sm xsm:text-sm md:text-sm lg:text-sm xl:text-lg">
              {highlight.text}
            </p>
            <div className="flex justify-end items-end text-right">
              <div className="bg-slate-800 w-[200px] xsm:mt-4 sm:mt-4 justify-items-end sm:w-full md:w-full xsm:w-full h-12 xsm: xsm:h-10 shadow-xl rounded-lg align-center cursor-pointer  hover:bg-slate-700 md:mb-4">
                <p className="flex pt-2 xsm:text-sm justify-center items-center text-white">
                  {highlight.btn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
