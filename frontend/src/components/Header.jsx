import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

function Header() {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-[#5f6fff] via-[#5262ff] to-[#4353ff] rounded-3xl px-6 md:px-10 lg:px-20 shadow-xl shadow-blue-500/10 overflow-hidden my-2'>
      {/* left side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-12 m-auto md:py-[8vw] md:mb-[-30px] z-10'>
        <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium border border-white/20'>
          <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
          Verified Healthcare Professionals
        </div>

        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight tracking-tight'>
          Book Appointment <br />
          <span className='text-blue-100 font-bold'>With Trusted Doctors</span>
        </h1>

        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-white/90 text-sm font-light leading-relaxed max-w-md'>
          <img className='w-28 drop-shadow-sm' src={assets.group_profiles} alt="Profiles" />
          <p>Simply browse through our extensive list of certified doctors & schedule your appointment hassle-free.</p>
        </div>

        <a 
          href='#speciality' 
          className='inline-flex items-center gap-3 bg-white text-[#5f6fff] font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-black/5 hover:bg-slate-50 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 group'
        >
          Book Appointment 
          <img src={assets.arrow_icon} className='w-3 h-3 group-hover:translate-x-1 transition-transform duration-200' alt="Arrow" />
        </a>
      </div>

      {/* right side */}
      <div className='md:w-1/2 relative flex items-end justify-center'>
        <img className='w-full max-w-lg md:max-w-none rounded-b-2xl md:rounded-none bottom-0 h-auto md:absolute object-cover transition-transform duration-500 hover:scale-[1.02]' src={assets.header_img} alt="Doctors Header" />
      </div>
    </div>
  )
}

export default Header
