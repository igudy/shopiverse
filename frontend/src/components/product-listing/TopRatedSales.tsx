import { topratedsales } from "../../data/data";
import ProductCards from '../reusable/ProductCards';

const TopRatedSales = () => {
  return (
    <div className="px-4 xsm:px-2">
      <p className="text-5xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl xsm:text-xl font-extrabold my-10 sm:my-6 xsm:my-4">
        {topratedsales.title}
      </p>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xsm:grid-cols-1 gap-6 xl:gap-5 lg:gap-4 md:gap-4 sm:gap-3 xsm:gap-3">
          {topratedsales?.items?.map((item: any) => (
            <div key={item.id}>
              <ProductCards
                id={item.id}
                title={item.title}
                text={item.text}
                rating={item.rating}
                btn={item.btn}
                img={item.img}
                price={item.price}
                color={item.color}
                shadow={item.shadow}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRatedSales;