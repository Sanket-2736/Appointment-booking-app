import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function TopDoctors() {
  const {doctors} = useContext(AppContext);

  const navigate = useNavigate();
  return (
    <div className='my-10 sm:my-20 flex flex-col items-center px-4'>
      <h1 className='text-5xl text-gray-700 sm:text-3xl my-3 font-bold text-center'>Top doctors to Book</h1>
      <hr className='w-20 bg-[#555] h-1.5 mb-5 rounded-lg' />
      <p className='text-base sm:text-lg py-3 px-4 text-center max-w-2xl'>Simply browse through our extensive list of trusted doctors.</p>
      
      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10 w-full max-w-6xl'>
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={() => navigate(`/appointment/${item._id}`)}
            key={index} 
            className='bg-blue-100 hover:cursor-pointer flex flex-col items-center shadow-lg shadow-blue-300 rounded-lg hover:-translate-y-2 transition-transform duration-300 p-4'
          >
            <div className='bg-white p-2 rounded-lg'>
              <img src={item.image} className='w-32 h-32 object-cover rounded-full' alt='Doctor' />
            </div>
            <div className='text-center mt-3'>
              <p className='text-cyan-900 text-lg font-bold'>{item.name}</p>
              <p className='font-semibold text-gray-700'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={() => {navigate('/doctors'); scrollTo(0, 0)}} className='my-12 bg-blue-200 px-6 py-2 rounded-full text-blue-800 hover:cursor-pointer hover:shadow-lg hover:bg-blue-300 transition-all duration-150'>
        More
      </button>
    </div>
  );
}

export default TopDoctors;
