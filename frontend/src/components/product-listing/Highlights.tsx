import { highlight } from '../../data/data';

const Highlights = () => {
  return (
    <div className="relative my-20 xsm:my-12 sm:my-14 px-4">
      <div className="flex flex-col-reverse md:flex-row gap-10 xsm:gap-6 items-center">
        {/* Image Section */}
        <div className="w-full xsm:flex xsm:justify-center">
          <img
            src={highlight.img}
            alt={highlight.heading}
            className="h-[50vh] xl:h-[45vh] lg:h-[40vh] md:h-[35vh] sm:h-[30vh] xsm:h-[25vh] w-auto object-contain transform -rotate-12 hover:rotate-0 transition duration-300 ease-in-out"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:text-right text-center">
          <p className="text-blue-600 font-bold text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg xsm:text-base mb-1">
            {highlight.heading}
          </p>
          <p className="font-extrabold text-slate-900 text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xsm:text-lg mb-2 drop-shadow">
            {highlight.title}
          </p>
          <p className="text-slate-800 text-base xl:text-sm lg:text-xs md:text-xs sm:text-xs xsm:text-xs mb-4">
            {highlight.text}
          </p>

          <div className="flex justify-center md:justify-end">
            <button
              onClick={() => alert('Coming Soon')}
              className="bg-slate-800 text-white md:text-sm text-xs w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 xsm:w-full h-12 xl:h-11 lg:h-10 md:h-9 sm:h-8 xsm:h-8 rounded-lg shadow hover:bg-slate-700 transition"
            >
              {highlight.btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;