import React, { useContext } from 'react'
import {assets} from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const {aToken, setAToken} = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/')
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
  }

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2 text-xs'>
        <img src={assets.admin_logo} className='cursor-pointer' onClick={() => navigate('/')} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-[#5f6fff] hover:bg-red-500 text-white text-sm px-10 py-2 mr-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
