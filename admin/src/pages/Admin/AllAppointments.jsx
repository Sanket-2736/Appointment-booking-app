import React from 'react'
import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext';
import {assets} from '../../assets/assets_admin/assets'

function AllAppointments() {

  const {appointments, cancelAppointment, getAllAppointments, calculateAge, aToken} = useContext(AdminContext);
  const {slotDateFormat, currency} = useContext(AppContext);
  useEffect(() => {
    if(aToken) getAllAppointments();
  }, []);

  

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='font-medium text-lg mb-3'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80px] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-bottom'>
          <p>#</p>
          <p>Patient </p>
          <p>Age </p>
          <p>Date & Time </p>
          <p>Doctor </p>
          <p>Fees </p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index) => {
            return (
              <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b hover:bg-gray-50' key={index}>
                <p className='max-sm:hidden'>{index + 1}</p>
                <div className='flex items-center gap-2'>
                  <img className='w-8 rounded-full' src={item.userData.image} alt="img" /> <p>{item.userData.name}</p>
                </div>

                <p className='max-sm:hidden'>{calculateAge(25_03_2025)}</p>
                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

                <div className='flex items-center gap-2'>
                  <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="img" /> <p>{item.docData.name}</p>
                </div>

                <p>{currency + item.amount}</p>               
                {
                  item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : <img onClick={() => cancelAppointment(item._id)} className='w-8 cursor-pointer' src={assets.cancel_icon} alt="" />
                }
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default AllAppointments
