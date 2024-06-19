import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Details from "../../components/productDetails/Details";
import ProductDetailsBottomTabs from "../../components/productDetails/ProductDetailsBottomTabs";

const ProductDetails = () => {
  return (
    <div>
      <Navbar />
      <Details />
      <ProductDetailsBottomTabs />
      <Footer />
    </div>
  );
};

export default ProductDetails;
