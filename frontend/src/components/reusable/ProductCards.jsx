import { AiFillStar } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setAddItemToCart } from "../redux/slices/CartSlice";

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
}) => {
  const dispatch = useDispatch();

  const addTocart = () => {
    const temp = { id, title, text, rating, btn, img, price, color, shadow };
    dispatch(setAddItemToCart(temp));
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
                  <BsFillCartCheckFill className="pt-1 hover:px-1" onClick={() => addTocart()}/>
                </span>
              </div>
              <span className="mt-1 pl-2 xl:text-md text-sm shadow-md cursor-pointer w-full bg-slate-200 hover:text-white text-black rounded-lg px-2 mx-[0.5px] hover:bg-slate-700">
                <p className="text-center">
                  {btn}
                </p>
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

ProductCards.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  btn: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  shadow: PropTypes.string.isRequired,
};

export default ProductCards;
