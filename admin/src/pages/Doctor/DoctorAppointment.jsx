import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

function DoctorAppointment() {

  const {dToken, appointments, getAppointments, calculateAge, markAsComplete, cancelAppointment} = useContext(DoctorContext);
  const {slotDateFormat, currency} = useContext(AppContext);

  useEffect(() => {
    if(dToken){
      getAppointments(dToken);
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border-2 rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p># </p>
          <p>Patient </p>
          <p>Payment </p>
          <p>Age </p>
          <p>Date and Time </p>
          <p>Fees </p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index) => {
            return (
              <div className='flex flex-wrap justify-between hover:bg-gray-50 max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b' key={index}>
                <p className='max-sm:hidden'>{index + 1}</p>
                <div className='flex items-center gap-2'><img src={item.userData.image} className='w-8 rounded-full ' alt="user img" /> <p>{item.userData.name}</p></div>
                <div>
                  <p className='text-xs inlie border border-[#5f6fff] px-2 rounded-full'>
                    {item.payment ? 'Online' : 'CASH'}
                  </p>
                </div>
                <p>{calculateAge(item.userData.dob)}</p>
                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                <p>{currency}{item.amount}</p>

                {
                  item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted 
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                      <img onClick={() => markAsComplete(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                    </div>
                }                
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DoctorAppointment
