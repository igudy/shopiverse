import React from 'react'
import LoginImage from '../../../src/assets/login/shoe-login.png'
import Navbar from '../../components/navbar/Navbar'
import Google from '../../../src/assets/icons/googleicon.svg'
import Footer from '../../components/footer/Footer'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <> 
    <Navbar />
    <div className='flex sm:block gap-5 justify-between mx-16 xsm:mx-2 sm:mx-2'>
    {/* <div className='bg-gradient-to-t from-purple-500 to-purple-300 h-10 sm:w-full'></div> */}
      <div className='basis-1/2 md:justify-center xsm:justify-center justify-center flex flex-col xsm:hidden sm:hidden md:hidden lg:hidden sm:justify-center left-0'>
        <img src={LoginImage} alt='loginImage' className='object-fill
            w-auto h-[50vh] lg:h-[35vh] justify-center md:h-[20vh] sm:my-3 md:my-3 sm:h-[21vh] xsm:h-[19vh] transitions-theme -rotate-[-15deg] hover:rotate-0 cursor-pointer z-20' />
      </div>

      <div className='flex flex-col mx-10 sm:mx-2 xsm:mx-2 p-5 my-7 shadow-2xl right-0'>
        <div className=''>
          {/* <img src={Logo} alt='logo' className='mt-10 h-10 xsm:h-7 sm:h-7' /> */}
          {/* SHOPIVERSE */}
        </div>
        <div>
          <h1 className='text-5xl font-bold font-serif my-3 mb-6 text-purple-00 xsm:text-xl sm:text-xl mt-10 md:text-2xl sm:mt-1'>Create your account.</h1>
        </div>
        <div>
        <form>
        <div className="my-3">
            <label htmlFor="email" className="">Email address</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5 sm:w-full sm:block" placeholder="john.doe@company.com" required/>
        </div> 
        <div className="my-3">
            <label htmlFor="password" className="mb-2 my-1 ">Password</label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5 sm:w-full sm:block" placeholder="•••••••••" required/>
        </div> 
      
        <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full px-5 py-2.5 text-center sm:w-full">Submit</button>
    </form>
    <div className='my-3 text-lg text-center justify-center sm:w-full sm:text-sm'>
      Don't have an account? <span className='text-blue-700 hover:text-blue-900 font-medium cursor-pointer underline'> <Link to="/register">
        Register Now
      </Link>
      </span>
      </div>
    </div>
    <div className='flex-row flex justify-center cursor-pointer sm:w-full'>
      <div className='text-lg sm:text-sm flex border-2 rounded-full hover:bg-purple-200 w-72 items-center justify-center text-center'>
        <img src={Google} className='w-6 h-16 mx-2 sm:w-4 sm:h-4 sm:text-sm' alt='google_image' /> Login with google
      </div>
    </div>

      </div>
    </div>
    <Footer />
    </>
  )
}

export default Login