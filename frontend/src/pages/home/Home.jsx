import React from "react";
import {
  Featured,
  Footer,
  Hero,
  Highlights,
  PopularSales,
  TopRatedSales,
  TopStories,
} from "./";

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

