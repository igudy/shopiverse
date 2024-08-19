import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import CheckoutPaypalSection from '../../components/checkout/CheckoutPaypalSection'

const CheckoutPaypal = () => {
  return (
    <div>
      <Navbar />
      <CheckoutPaypalSection />
      <Footer />
    </div>
  )
}

export default CheckoutPaypal