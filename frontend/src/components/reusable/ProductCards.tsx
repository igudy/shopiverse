import { AiFillStar } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../redux/slices/cart/CartSlice";
import { truncate } from "lodash";
import { Link } from "react-router-dom";

// interface IAllProductsCard {
//   id: string;
//   title: string;
//   text: string;
//   price: number;
//   rating: string;
//   img: string;
//   discountPrice: string;
// }

export const AllProductsCard = ({
  id,
  title,
  text,
  price,
  rating,
  img,
  discountPrice,
}: any) => {
  const truncatedTitle = truncate(title, {
    length: 20,
    omission: "...",
  });

  return (
    <>
      <div
        className="flex w-full items-center rounded-xl shadow-xl bg-gradient-to-r 
        from-purple-700 to-purple-500  hover:bg-gradient-to-b p-2
        text-white h-[180px] min-h-[180px] max-h-[180px] cursor-pointer"
      >
        <div className="flex-col gap-2 w-[55%] p-1">
          <p className="text-[15px] font-bold leading-tight">
            {truncatedTitle}
          </p>
          <p className="text-[10px] mt-1">{text}</p>
          <div className="flex gap-1 mt-2 items-center">
            <p className="font-bold text-[10px] lg:font-bold xl:font-bold md:font-bold cursor-pointer line-through leading-tight">
              ${price}
            </p>
            <p className="font-bold lg:font-bold xl:font-bold md:font-bold text-[12px] cursor-pointer leading-tight">
              ${discountPrice}
            </p>
          </div>
          <div className="bg-slate-200 w-12 sm:w-8 md:w-16 lg:w-10 rounded-lg drop-shadow-xl text-black cursor-pointer my-1 mb-2">
            <p className="flex text font-medium sm justify-center items-center text-[13px] md:font-bold md:text-md md:mt-[2px] cursor-pointer leading-tight">
              {rating} <AiFillStar className="text-yellow-500" />
            </p>
          </div>
          <div className="flex items-center">
            <div className="border-[2px] w-10 h-6 cursor-pointer rounded-full drop-shadow-xl mr-[2px] text-inherit items-center">
              <span className="flex text-center items-center justify-center">
                <BsFillCartCheckFill className="pt-1 hover:px-1" />
              </span>
            </div>
            <span className="mt-1 pl-2 xl:text-md shadow-md w-[100%] cursor-pointer bg-slate-200 hover:text-white text-black rounded-lg px-2 mx-[0.5px] hover:bg-slate-700">
              <p className="text-center leading-tight text-[10px]">Buy Now</p>
            </span>
          </div>
        </div>
        <div className="w-[45%] overflow-hidden">
          <Link to={`/productDetails/${id}`}>
            <img
              src={img}
              alt="image"
              className="w-full h-[165px] object-cover rounded-lg cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-95"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

// interface IProductsCard {
//   id: string;
//   title: string;
//   text: string;
//   rating: string;
//   btn: string;
//   img: string;
//   price: string;
//   color: string;
//   shadow: string;
// }

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

    console.log("Added to cart!")
  };

  return (
    <>
      <div
        className={`relative bg-gradient-to-b ${color} ${shadow} rounded-xl py-2 xsm:py-1 sm:py-2 px-3 transition-all duration-700 ease-in-out hover:scale-95 h-[210px] xsm:h-[200px] text-white sm:my-[0.5px] shadow-lg`}
      >
        <div className="flex flex-row sm:mt-5 mt-4">
          <div className="">
            <p className="xsm:font-sm xsm:font-bold font-bold">{title}</p>
            <p>{text}</p>
            <div className="flex gap-2 my-2">
              <p className="font-bold sm:text-sm xsm:text-sm lg:font-bold xl:font-bold md:font-bold md:text-xl lg:text-lg cursor-pointer">
                ${price}
              </p>
              <span className="bg-slate-200 w-12 sm:w-8 md:w-16 lg:w-10 rounded-lg drop-shadow-xl text-black cursor-pointer">
                <p className="flex text font-medium sm:text-sm justify-center items-center md:font-bold md:text-md md:mt-[2px] cursor-pointer">
                  {rating} <AiFillStar className="text-yellow-500" />
                </p>
              </span>
            </div>
            <div className="flex items-center">
              <div className="border-[2px] w-7 h-6 cursor-pointer rounded-full drop-shadow-xl mr-[2px] text-inherit items-center">
                <span className="flex text-center items-center justify-center">
                  <BsFillCartCheckFill
                    className="pt-1 hover:px-1"
                    onClick={() => addTocart()}
                  />
                </span>
              </div>
              <span className="mt-1 pl-2 xl:text-md text-sm shadow-md cursor-pointer w-full bg-slate-200 hover:text-white text-black rounded-lg px-2 mx-[0.5px] hover:bg-slate-700">
                <p className="text-center">{btn}</p>
              </span>
            </div>
          </div>
          <div className="basis-[70%]">
            <img
              src={img}
              alt={title}
              className="h-[16vh] sm:h-[13vh] xsm:h-[10vh] md:h-[13vh] lg:h-[12vh] w-auto transitions-theme -rotate-[15deg] hover:rotate-0 cursor-pointer object-fill xsm:ml-2 sm:ml-2 sm:mt-4 xsm:mt-4"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCards;
