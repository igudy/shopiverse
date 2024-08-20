import React from 'react'
import CheckoutSummary from '../checkoutdetails/CheckoutSummary'

const CheckoutWalletSection = () => {
  return (
        <div>
      <div className="flex px-10 gap-10 mb-10">
        <div className="w-[50%]">
          <CheckoutSummary />
        </div>
        <div className="w-[50%] mt-10">
          <div>Checkout wallet section</div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutWalletSection