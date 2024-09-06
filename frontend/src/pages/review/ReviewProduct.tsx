import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ReviewProductComp from
    '../../components/review-product/ReviewProductComp'

const ReviewProduct = () => {
  return (
        <div>
      <Navbar />
      <div className="mx-14">
        <ReviewProductComp />
      </div>
      <Footer />
    </div>
  )
}

export default ReviewProduct