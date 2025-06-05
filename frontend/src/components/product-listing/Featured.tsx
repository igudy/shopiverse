import { featured } from '../../data/data';

const Featured = () => {
  return (
    <div className="my-16 md:my-20 px-4">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-8">
        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <div className="text-center md:text-left">
            <p className="font-bold text-blue-600 text-2xl md:text-3xl mb-2">
              {featured.heading}
            </p>
            <p className="font-extrabold text-slate-900 text-2xl md:text-3xl drop-shadow-2xl mb-3">
              {featured.title}
            </p>
            <p className="text-slate-800 text-sm md:text-base mb-4 md:mb-5">
              {featured.text}
            </p>

            <div className="flex justify-center md:justify-start">
              <div className="bg-slate-800 w-full md:w-[200px] h-10 md:h-12 rounded-lg shadow-xl hover:bg-slate-700 transition duration-300 cursor-pointer flex items-center justify-center">
                <p className="text-white text-xs md:text-sm">
                  {featured.btn}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={featured.img}
            alt={featured.title}
            className="object-contain w-auto h-[10rem] md:h-[14rem] transition-transform duration-300 -rotate-[15deg] hover:rotate-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;