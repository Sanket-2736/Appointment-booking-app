import React from 'react';
import { assets } from '../assets/assets/assets_frontend/assets';

function Footer() {
  return (
    <div className='bg-blue-100 shadow-blue-200 shadow-md my-5 rounded-lg px-6 sm:px-10 lg:px-16 py-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Left side */}
        <div className='flex flex-col items-center sm:items-start'>
          <img className='mb-4' src={assets.logo} alt='logo' />
          <p className='text-gray-600 text-center sm:text-left'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis aperiam cum, nisi a vero perferendis. Minima adipisci dignissimos praesentium delectus quidem repellendus tenetur officiis molestiae expedita non hic totam.
          </p>
        </div>

        {/* Center side */}
        <div className='flex flex-col items-center sm:items-start'>
          <p className='text-cyan-800 text-lg font-bold mb-2'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-700'>
            <li className='hover:translate-y-[-4px] hover:cursor-pointer hover:underline transition-all duration-200'>Home</li>
            <li className='hover:translate-y-[-4px] hover:cursor-pointer hover:underline transition-all duration-200'>About Us</li>
            <li className='hover:translate-y-[-4px] hover:cursor-pointer hover:underline transition-all duration-200'>Contact Us</li>
            <li className='hover:translate-y-[-4px] hover:cursor-pointer hover:underline transition-all duration-200'>Privacy Policy</li>
          </ul>
        </div>

        {/* Right side */}
        <div className='flex flex-col items-center sm:items-start'>
          <h3 className='text-cyan-800 text-lg font-bold mb-2'>GET IN TOUCH</h3>
          <ul className='text-gray-700'>
            <li>+91 987 652 1345</li>
            <li>prescripto.app@email.com</li>
          </ul>
        </div>
      </div>
      
      <hr className='w-full h-1 bg-gray-300 my-4' />
      <p className='text-center text-gray-700'>
        Copyright 2025 &copy; Prescripto | All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;