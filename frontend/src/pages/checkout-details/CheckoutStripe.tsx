import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import CheckoutStripeComp from '../../components/checkoutdetails/CheckoutStripeComp'
import Footer from '../../components/footer/Footer'

const CheckoutStripe = () => {
  return (
      <div>
          <Navbar />
          <CheckoutStripeComp />
          <Footer />
    </div>
  )
}

export default CheckoutStripe