import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer';
import CheckoutDetailsSection from '../../components/checkoutdetails/CheckoutDetailsSection';

const CheckoutDetails = () => {
  return (
      <div>
          <Navbar />
          <CheckoutDetailsSection />
          <Footer />
    </div>
  )
}

export default CheckoutDetails;