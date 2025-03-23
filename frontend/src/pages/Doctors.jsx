import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Doctors() {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false)

  const applyFilter = () => {
    if (!doctors) return;
    setFilterDoc(
      speciality
        ? doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase())
        : doctors
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const handleNavigate = (category) => {
    navigate(speciality?.toLowerCase() === category.toLowerCase() ? '/doctors' : `/doctors/${category}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl text-gray-700 sm:text-3xl my-3 font-bold text-center">Our Doctors</h1>
      <hr className="outline-0 border-0 w-20 bg-[#555] h-1.5 mb-2 rounded-lg" />
      <p className="text-lg py-3 px-4 text-center max-w-2xl">
        Browse through the doctors' specialties
      </p>

      <button className={`py-3 px-6 rounded-3xl border text-sm transition-all sm:hidden ${showFilter ? 'bg-[#5F6FFF] text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
  
      {/* Container for Categories and Doctors */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center text-center mt-5 w-full max-w-6xl">
        {/* Right side - Doctors */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10 w-full">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-blue-100 hover:cursor-pointer flex flex-col items-center shadow-lg shadow-blue-300 rounded-lg hover:-translate-y-2 transition-transform duration-300 p-4"
            >
              <div className="bg-white p-2 rounded-lg">
                <img src={item.image} className="w-32 h-32 object-cover rounded-full" alt="Doctor" />
              </div>
              <div className="text-center mt-3">
                <p className="text-cyan-900 text-lg font-bold">{item.name}</p>
                <p className="font-semibold text-gray-700">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Left side - Categories */}
        <div className={`w-full sm:w-1/3 px-1 mb-4 sm:mb-0 ${showFilter ? '' : 'hidden sm:block'}`}>
          {['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((category) => (
            <p
              key={category}
              onClick={() => handleNavigate(category)}
              className="bg-blue-100 px-8 py-3 rounded-full border-2 transition duration-300 hover:translate-y-[3px] border-blue-500 cursor-pointer mb-2 w-2/3 mx-auto"
            >
              {category}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Doctors;
