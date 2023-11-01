import truncate from "lodash/truncate";
import { AiFillHeart } from "react-icons/ai";

const StoriesCard = ({ title, text, img, url, like, time, by, btn }) => {
  const truncatedText = truncate(text, {
    length: 120,
    omission: "...",
  });
  return (
    <>
      <div className="mx-2 max-h-[500px] w-[400px] mb-10 rounded-2xl shadow-2xl text-black text-xs">
        <div>
          <img src={img} className="rounded-t-xl w-full" alt={title} />
        </div>
        <div className="px-2">
          <div className="flex justify-between gap-5 my-3">
            <div className="left-0 flex gap-[0.5px] items-center">
              <AiFillHeart className="h-4 w-4 text-red-700" />
              {like}
            </div>
            <div className="text-center align-center flex ">{time}</div>
            <div className="right-0 text-blue-700 ">#{by}</div>
          </div>
          <div>
            <p className=" font-bold">{title}</p>
            <p className="mb-14">{truncatedText}</p>
          </div>
          <div className="flex text-center justify-center w-full my-5 bg-black rounded-xl h-8">
            <a href={url}>
              <p className="text-white text-center mt-2 justify-center items-center">
                {btn}
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoriesCard;
