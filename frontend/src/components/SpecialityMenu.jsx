import React from 'react';
import { specialityData } from '../assets/assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

function SpecialityMenu() {
  return (
    <div id='speciality' className='flex flex-col py-10 items-center px-4 md:px-8'>
      <h1 className='text-5xl text-gray-700 sm:text-3xl my-3 font-bold text-center'>
        Find by Speciality
      </h1>
      <hr className="outline-0 border-0 w-20 bg-[#555] h-1.5 mb-5 rounded-lg" />
      <p className='text-lg py-3 px-4 text-center max-w-2xl'>
        Simply browse through a list of entrusted specialists, schedule your appointments, and have a great experience!
      </p>

      {/* Responsive Grid Layout */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10'>
        {specialityData.map((item, id) => (
          <Link onClick={() => scrollTo(0, 0)} to={`/doctors/${item.speciality}`} key={id} className='flex hover:translate-y-[-10px] flex-col items-center cursor-pointer transform transition duration-300 hover:scale-105'>
            <img className='rounded-full w-24 h-24 object-cover' src={item.image} alt={item.speciality} />
            <p className='mt-2 text-center font-medium'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialityMenu;
