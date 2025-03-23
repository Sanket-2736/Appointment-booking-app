import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom'; 

function RelatedDoctors({ docId, speciality }) { 
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div>
      <div className='grid grid-cols-auto xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10 w-full max-w-6xl'>
        {relDoc.map((item, index) => (
          <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0, 0)}}
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
    </div>
  );
}

export default RelatedDoctors;
