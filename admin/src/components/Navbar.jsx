import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/')
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs'>
      <div className='flex items-center gap-3 text-xs'>
        <img src={assets.admin_logo} className='w-36 sm:w-40 cursor-pointer hover:opacity-90 transition' onClick={() => navigate('/')} alt="Admin Logo" />
        <span className='border px-3 py-1 rounded-full border-blue-200 bg-blue-50 text-[#5f6fff] font-semibold text-[11px] uppercase tracking-wider shadow-2xs'>
          {aToken ? 'Admin Panel' : 'Doctor Panel'}
        </span>
      </div>
      <button 
        onClick={logout} 
        className='bg-[#5f6fff] hover:bg-rose-600 text-white text-xs sm:text-sm font-medium px-6 sm:px-8 py-2 rounded-full cursor-pointer shadow-sm hover:shadow transition-all duration-200 active:scale-95'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
