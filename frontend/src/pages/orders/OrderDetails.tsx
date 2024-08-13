import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import OrderDetialsComponent from '../../components/orders/OrderDetialsComponent'
import Footer from '../../components/footer/Footer'

const OrderDetails = () => {
  return (
      <div>
          <Navbar />
          <OrderDetialsComponent />
          <Footer />
    </div>
  )
}

export default OrderDetails