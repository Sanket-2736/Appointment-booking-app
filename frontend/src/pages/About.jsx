import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

function About() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-400'>
        <b><p>ABOUT <span className='text-gray-700 font-medium'>US</span></p></b>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="About img" />
        <div className='flex flex-col text-lg justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to prescripto, your trusted doctor appointment booking application.</p>
          <p>We are managing your healthcare from last 5 years. We are committed to exceellence in helthcare technology</p>
          <b className='text-gray-700'>OUR VISION</b>
          <p>Our Vision is to create a aseamless healthcare experience for every problem.</p>
        </div>
      </div>

      <div className="text-xl my-4">
        <b><p>WHY <span className="text-gray-700 font-sm">CHOOSE US?</span></p></b>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 cursor-pointer'>
          <b>EFFICIENCY: </b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 cursor-pointer'>
          <b>CONVENIENCE: </b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 cursor-pointer'>
          <b>PERSONALIZATION: </b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
