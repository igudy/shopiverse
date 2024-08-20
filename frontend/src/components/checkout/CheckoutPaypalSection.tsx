import React from 'react'
import CheckoutSummary from '../checkoutdetails/CheckoutSummary'

const CheckoutPaypalSection = () => {
  return (
       <div>
      <div className="flex px-10 gap-10 mb-10">
        <div className="w-[50%]">
          <CheckoutSummary />
        </div>
        <div className="w-[50%] mt-10">
          <div>Checkout flutter wave</div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPaypalSection