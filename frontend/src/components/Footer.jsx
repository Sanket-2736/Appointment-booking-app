import React from 'react';
import { assets } from '../assets/assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='bg-slate-50 border-t border-slate-200 mt-16 rounded-3xl p-8 sm:p-12 mb-6'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto'>
        {/* Left side */}
        <div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
          <img className='w-40 mb-4' src={assets.logo} alt='Prescripto Logo' />
          <p className='text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm'>
            Prescripto is a leading doctor appointment booking platform connecting patients with top certified healthcare professionals seamlessly.
          </p>
        </div>

        {/* Center side */}
        <div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
          <p className='text-xs font-bold text-slate-800 uppercase tracking-wider mb-4'>COMPANY</p>
          <ul className='flex flex-col gap-2.5 text-xs sm:text-sm text-slate-600 font-medium'>
            <li><Link to='/' onClick={() => scrollTo(0,0)} className='hover:text-[#5f6fff] transition-colors'>Home</Link></li>
            <li><Link to='/doctors' onClick={() => scrollTo(0,0)} className='hover:text-[#5f6fff] transition-colors'>All Doctors</Link></li>
            <li><Link to='/about' onClick={() => scrollTo(0,0)} className='hover:text-[#5f6fff] transition-colors'>About Us</Link></li>
            <li><Link to='/contact' onClick={() => scrollTo(0,0)} className='hover:text-[#5f6fff] transition-colors'>Contact Us</Link></li>
            <li><Link to='/blog' onClick={() => scrollTo(0,0)} className='hover:text-[#5f6fff] transition-colors'>Health Blog</Link></li>
          </ul>
        </div>

        {/* Right side */}
        <div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
          <h3 className='text-xs font-bold text-slate-800 uppercase tracking-wider mb-4'>GET IN TOUCH</h3>
          <ul className='flex flex-col gap-2 text-xs sm:text-sm text-slate-600 font-medium'>
            <li className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-[#5f6fff]' />
              +91 987 652 1345
            </li>
            <li className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-[#5f6fff]' />
              support@prescripto.com
            </li>
          </ul>
        </div>
      </div>
      
      <div className='border-t border-slate-200 mt-10 pt-6 text-center text-xs text-slate-400 font-medium'>
        Copyright 2026 &copy; Prescripto | All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;