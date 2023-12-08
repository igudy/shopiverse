import Hero from "../../components/hero/Hero";
import PopularSales from "../../components/product-listing/PopularSales";
import Highlights from "../../components/product-listing/Highlights";
import TopRatedSales from "../../components/product-listing/TopRatedSales";
import Featured from "../../components/product-listing/Featured";
import TopStories from "../../components/product-listing/TopStories";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="mx-14 sm:mx-2 xsm:mx-1 md:mx-5">
        <PopularSales />
        <Highlights />
        <TopRatedSales />
        <Featured />
        <TopStories />
      </div>
      <Footer />
    </>
  );
};

export default Home;

