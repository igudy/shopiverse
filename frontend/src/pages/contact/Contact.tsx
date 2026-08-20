import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Get in touch with our support team.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact