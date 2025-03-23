import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

function Banner() {
  return (
    <div className='flex mb-5 flex-col md:flex-row flex-wrap bg-[#5f6fff] rounded-lg px-6 md:px-10 lg:px-20'>
      {/* /Left side */}
      <div className='md:w-1/2 flex-1 items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <div>
            <h2 className='text-3xl md:text-4xl lg:text-5xl text-white leading tight font-semibold leading-tight lg:leading-tight'>Book Appointment</h2>
            <h1 className='text-4xl md:text-5xl lg:text-6xl text-white leading tight font-semibold leading-tight lg:leading-tight'>With 100+ Trusted Doctors</h1>
        </div>
        <button className='flex items-center padding bg-white gap-2 px-8 py-3 rounded-full text-gray-600 md:m-0 hover:scale-105 transition-all duration-300'>Create Account</button>
      </div>

      {/* right side */}
      <div className='md:w-1/2 relative hidden md:block lg-w-[370px]'>
        <img className='w-full rounded-large bottom-0 h-auto md:absolute' src={assets.appointment_img} alt="appointment_img" />
      </div>
    </div>
  )
}

export default Banner
