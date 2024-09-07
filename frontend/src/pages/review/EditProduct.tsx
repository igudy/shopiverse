import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import EditProductComp from '../../components/review-product/EditProductComp'

const EditProduct = () => {
  return (
        <div>
      <Navbar />
      <div className="mx-14">
        <EditProductComp />
      </div>
      <Footer />
    </div>
  )
}

export default EditProduct