import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

function Header() {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#5f6fff] rounded-lg px-6 md:px-10 lg:px-20'>
      {/* left side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white leading tight font-semibold leading-tight lg:leading-tight'>Book Appointment <br/> With Trusted Doctors</p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
            <img className='w-28' src={assets.group_profiles} alt="" />
            <p>Simply browse through our extensive list of doctors</p>
        </div>
        <a href='#speciality' className='flex items-center padding bg-white gap-2 px-8 py-3 rounded-full text-gray-600 md:m-0 hover:scale-105 transition-all duration-300'>
            Book Appointment <img src={assets.arrow_icon} className='w-3'></img>
        </a>
      </div>

      {/* right side */}

      <div className='md:w-1/2 relative'>
        <img className='w-full rounded-large bottom-0 h-auto md:absolute' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
