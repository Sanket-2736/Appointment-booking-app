import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets_admin/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

function Sidebar() {

  const {aToken} = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);

  return (
    <div className='bg-white border-r h-screen'>
      {
        aToken && <ul className='mt-5 text-gray-700'>
            <NavLink className={({isActive}) => `flex items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?  "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""}`} to='admin-dashboard'>
                <img src={assets.home_icon} alt="Home Icon" />
                <p className='hidden md:block'>DashBoard</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?  "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""}`} to='all-appointments'>
                <img src={assets.appointment_icon} alt="Appointment Icon" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?  "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""}`} to='add-doctor'>
                <img src={assets.add_icon} alt="Add Doctor Icon" />
                <p className='hidden md:block'>Add Doctor</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?  "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""}`} to='doctor-list'>
                <img src={assets.people_icon} alt="Home Icon" />
                <p className='hidden md:block'>Doctors</p>
            </NavLink>
        </ul>
      }

      {
        dToken && <ul className='mt-5 text-gray-700'>
            <NavLink className={({isActive}) => `flex items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?  "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""}`} to='doctor-dashboard'>
                <img src={assets.home_icon} alt="Home Icon" />
                <p className='hidden md:block'>DashBoard</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?  "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""}`} to='doctor-appointments'>
                <img src={assets.appointment_icon} alt="Appointment Icon" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?  "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""}`} to='doctor-profile'>
                <img src={assets.people_icon} alt="Add Doctor Icon" />
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
