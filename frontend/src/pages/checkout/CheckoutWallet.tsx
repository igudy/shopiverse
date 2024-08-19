import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import CheckoutWalletSection from '../../components/checkout/CheckoutWalletSection'

const CheckoutWallet = () => {
  return (
    <div>
      <Navbar />
      <CheckoutWalletSection />
      <Footer />
    </div>
  )
}

export default CheckoutWallet