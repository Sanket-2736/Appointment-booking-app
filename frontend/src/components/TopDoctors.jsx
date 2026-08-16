import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function TopDoctors() {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='py-12 sm:py-16 flex flex-col items-center px-4 max-w-7xl mx-auto'>
      <div className='text-center max-w-2xl mx-auto'>
        <span className='text-xs font-semibold uppercase tracking-wider text-[#5f6fff] bg-blue-50 px-3 py-1 rounded-full border border-blue-100'>
          Certified Specialists
        </span>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight mt-3 mb-3'>
          Top Doctors to Book
        </h2>
        <p className='text-slate-500 text-sm sm:text-base leading-relaxed'>
          Browse through our top-rated medical practitioners, check availability, and schedule your appointment today.
        </p>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12 w-full max-w-6xl'>
        {doctors.slice(0, 10).map((item, index) => (
          <div 
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
            key={index} 
            className='bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col'
          >
            <div className='bg-blue-50/50 flex items-center justify-center p-4 relative overflow-hidden'>
              <img 
                src={item.image} 
                className='w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-full border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300' 
                alt={item.name} 
              />
            </div>
            
            <div className='p-4 text-center flex-1 flex flex-col justify-between'>
              <div>
                <div className='flex items-center justify-center gap-1.5 mb-1.5'>
                  <span className={`w-2 h-2 rounded-full ${item.available !== false ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${item.available !== false ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {item.available !== false ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <h3 className='text-slate-800 font-bold text-base group-hover:text-[#5f6fff] transition-colors leading-tight'>
                  {item.name}
                </h3>
                <p className='text-slate-500 text-xs font-medium mt-1'>{item.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} 
        className='mt-12 bg-blue-50 text-[#5f6fff] font-semibold text-sm px-8 py-3 rounded-full hover:bg-[#5f6fff] hover:text-white hover:shadow-lg shadow-blue-500/10 active:scale-95 transition-all duration-200 cursor-pointer border border-blue-100'
      >
        View All Doctors
      </button>
    </div>
  );
}

export default TopDoctors;
