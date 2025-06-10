import { AiFillStar } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { truncate } from "lodash";
import { Link } from "react-router-dom";
import { beComingSoon, comingSoon } from "../../utils";

export const AllProductsCard = ({
  id,
  title,
  text,
  price,
  rating,
  img,
  discountPrice,
}: any) => {
  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg 
    transition-shadow duration-300 overflow-hidden border
     border-gray-100 h-[330px] sm:h-[350px]"
    >
      <Link to={`/productDetails/${id}`} className="w-full">
        <img
          src={img}
          alt={title}
          className="w-full h-[180px] object-cover transition-transform 
          duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-grow justify-between p-3 sm:p-4">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 h-5 flex-wrap">
            {truncate(title, { length: 20 })}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{text}</p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-400 line-through text-xs">
              ₦{price.toLocaleString()}
            </span>
            <span className="text-purple-600 font-bold text:xl sm:text-2xl">
              ₦{discountPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
            {rating}
            <AiFillStar className="text-yellow-400 ml-1" />
          </div>
          <button
            onClick={beComingSoon}
            className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-full transition-colors duration-200"
          >
            <BsFillCartCheckFill />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductCards = ({
  id,
  title,
  text,
  rating,
  btn,
  img,
  price,
  color,
  shadow,
}: any) => {
  const dispatch = useDispatch<any>();

  const addTocart = () => {
    // const temp = { id, title, text, rating, btn, img, price, color, shadow };
    // dispatch(ADD_TO_CART(temp));
  };

  return (
    <>
      <div
        className={`relative bg-gradient-to-b ${color} ${shadow} rounded-xl
         py-2 xsm:py-1 sm:py-2 px-3 transition-all duration-700 ease-in-out
          hover:scale-95 md:h-[250px] h-[200px] text-white
          sm:my-[0.5px] shadow-lg`}
      >
        <div className="flex flex-row sm:mt-5 mt-4">
          <div className="">
            <p className="xsm:font-sm xsm:font-bold font-bold">{title}</p>
            <p>{text}</p>
            <div className="flex gap-2 my-2">
              <p
                className="font-bold sm:text-sm xsm:text-sm lg:font-bold
               xl:font-bold md:font-bold md:text-xl lg:text-lg cursor-pointer"
              >
                ${price}
              </p>
              <span
                className="bg-slate-200 w-12 sm:w-8 md:w-16 lg:w-10 rounded-lg 
              drop-shadow-xl text-black cursor-pointer"
              >
                <p
                  className="flex text font-medium sm:text-sm justify-center
                 items-center md:font-bold md:text-md md:mt-[2px] cursor-pointer"
                >
                  {rating} <AiFillStar className="text-yellow-500" />
                </p>
              </span>
            </div>
            <div className="flex items-center">
              <div
                className="border-[2px] w-7 h-6 cursor-pointer rounded-full
               drop-shadow-xl mr-[2px] text-inherit items-center"
              >
                <span
                  className="flex text-center items-center
                 justify-center"
                >
                  <BsFillCartCheckFill
                    className="pt-1 hover:px-1"
                    onClick={comingSoon}
                  />
                </span>
              </div>
              <span
                className="mt-1 pl-2 xl:text-md text-sm shadow-md
               cursor-pointer w-full bg-slate-200 hover:text-white
                text-black rounded-lg px-2 mx-[0.5px]
                 hover:bg-slate-700"
              >
                <p className="text-center" onClick={comingSoon}>
                  {btn}
                </p>
              </span>
            </div>
          </div>
          <div className="basis-[70%]">
            <img
              src={img}
              alt={title}
              className="h-[7rem]
              md:h-[10rem] w-auto transitions-theme -rotate-[15deg] 
              hover:rotate-0 cursor-pointer object-fill xsm:ml-2 
              sm:ml-2 sm:mt-4 xsm:mt-4"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCards;
