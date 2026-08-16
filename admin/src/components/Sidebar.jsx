import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets_admin/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

function Sidebar() {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const activeStyle = "bg-[#f2f3ff] text-[#5f6fff] font-semibold border-r-4 border-[#5f6fff]";
  const normalStyle = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";

  return (
    <div className='bg-white border-r border-slate-200 min-h-screen w-16 md:w-64 transition-all duration-300'>
      {
        aToken && <ul className='mt-6 space-y-1.5'>
          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-4 md:px-7 cursor-pointer transition-all duration-200 ${isActive ? activeStyle : normalStyle}`} 
            to='admin-dashboard'
          >
            <img className='w-5 h-5 object-contain' src={assets.home_icon} alt="Dashboard Icon" />
            <p className='hidden md:block text-sm tracking-wide'>Dashboard</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-4 md:px-7 cursor-pointer transition-all duration-200 ${isActive ? activeStyle : normalStyle}`} 
            to='all-appointments'
          >
            <img className='w-5 h-5 object-contain' src={assets.appointment_icon} alt="Appointments Icon" />
            <p className='hidden md:block text-sm tracking-wide'>Appointments</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-4 md:px-7 cursor-pointer transition-all duration-200 ${isActive ? activeStyle : normalStyle}`} 
            to='add-doctor'
          >
            <img className='w-5 h-5 object-contain' src={assets.add_icon} alt="Add Doctor Icon" />
            <p className='hidden md:block text-sm tracking-wide'>Add Doctor</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-4 md:px-7 cursor-pointer transition-all duration-200 ${isActive ? activeStyle : normalStyle}`} 
            to='doctor-list'
          >
            <img className='w-5 h-5 object-contain' src={assets.people_icon} alt="Doctors Icon" />
            <p className='hidden md:block text-sm tracking-wide'>Doctors List</p>
          </NavLink>
        </ul>
      }

      {
        dToken && <ul className='mt-6 space-y-1.5'>
          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-4 md:px-7 cursor-pointer transition-all duration-200 ${isActive ? activeStyle : normalStyle}`} 
            to='doctor-dashboard'
          >
            <img className='w-5 h-5 object-contain' src={assets.home_icon} alt="Dashboard Icon" />
            <p className='hidden md:block text-sm tracking-wide'>Dashboard</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-4 md:px-7 cursor-pointer transition-all duration-200 ${isActive ? activeStyle : normalStyle}`} 
            to='doctor-appointments'
          >
            <img className='w-5 h-5 object-contain' src={assets.appointment_icon} alt="Appointments Icon" />
            <p className='hidden md:block text-sm tracking-wide'>Appointments</p>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3.5 px-4 md:px-7 cursor-pointer transition-all duration-200 ${isActive ? activeStyle : normalStyle}`} 
            to='doctor-profile'
          >
            <img className='w-5 h-5 object-contain' src={assets.people_icon} alt="Profile Icon" />
            <p className='hidden md:block text-sm tracking-wide'>Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
