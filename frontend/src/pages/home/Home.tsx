import Hero from "../../components/hero/Hero";
import PopularSales from "../../components/product-listing/PopularSales";
import Highlights from "../../components/product-listing/Highlights";
import TopRatedSales from "../../components/product-listing/TopRatedSales";
import Featured from "../../components/product-listing/Featured";
import TopStories from "../../components/product-listing/TopStories";
import Footer from "../../components/footer/Footer";
import MainProducts from "../../components/product-listing/MainProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-10 xl:mx-14">
        <PopularSales />
        <Highlights />
        <MainProducts />
        <TopRatedSales />
        <Featured />
        <TopStories />
      </div>
      <Footer />
    </>
  );
};

export default Home;
