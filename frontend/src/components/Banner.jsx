import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

function Banner() {
  const navigate = useNavigate();

  return (
    <div className='flex my-12 flex-col md:flex-row flex-wrap bg-gradient-to-r from-[#5f6fff] via-[#5262ff] to-[#4353ff] rounded-3xl px-6 md:px-14 lg:px-20 shadow-xl shadow-blue-500/10 overflow-hidden relative'>
      {/* Left side */}
      <div className='md:w-1/2 flex-1 flex flex-col items-start justify-center gap-5 py-12 md:py-[8vw] z-10'>
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium border border-white/20'>
          Get Started Today
        </div>
        <div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl text-white font-extrabold leading-tight tracking-tight'>
            Book Appointment
          </h2>
          <h3 className='text-2xl md:text-3xl lg:text-4xl text-blue-100 font-bold mt-1'>
            With 100+ Trusted Doctors
          </h3>
        </div>
        <button 
          onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
          className='inline-flex items-center gap-2.5 bg-white text-[#5f6fff] font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-black/5 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer mt-2'
        >
          Create Account
        </button>
      </div>

      {/* Right side */}
      <div className='md:w-1/2 relative hidden md:block lg:w-[370px] flex items-end justify-center'>
        <img className='w-full max-w-md rounded-b-2xl md:rounded-none bottom-0 h-auto md:absolute object-cover transition-transform duration-500 hover:scale-[1.02]' src={assets.appointment_img} alt="Appointment Banner" />
      </div>
    </div>
  )
}

export default Banner
