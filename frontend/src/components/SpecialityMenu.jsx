import React from 'react';
import { specialityData } from '../assets/assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

function SpecialityMenu() {
  return (
    <div id='speciality' className='flex flex-col py-16 items-center px-4 md:px-8'>
      <div className='text-center max-w-2xl mx-auto'>
        <span className='text-xs font-semibold uppercase tracking-wider text-[#5f6fff] bg-blue-50 px-3 py-1 rounded-full border border-blue-100'>
          Explore Specialties
        </span>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight mt-3 mb-3'>
          Find by Speciality
        </h2>
        <p className='text-slate-500 text-sm sm:text-base leading-relaxed'>
          Simply browse through our comprehensive list of certified medical specialists and book your consultation in seconds.
        </p>
      </div>

      {/* Grid Layout */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 mt-12 w-full max-w-6xl'>
        {specialityData.map((item, id) => (
          <Link 
            onClick={() => scrollTo(0, 0)} 
            to={`/doctors/${item.speciality}`} 
            key={id} 
            className='flex flex-col items-center group cursor-pointer p-4 rounded-2xl bg-white border border-transparent hover:border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
          >
            <div className='p-3 bg-blue-50/80 rounded-full group-hover:bg-[#5f6fff]/10 transition-colors duration-300'>
              <img className='w-16 h-16 sm:w-20 sm:h-20 object-contain group-hover:scale-110 transition-transform duration-300' src={item.image} alt={item.speciality} />
            </div>
            <p className='mt-3 text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-[#5f6fff] text-center transition-colors'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialityMenu;
