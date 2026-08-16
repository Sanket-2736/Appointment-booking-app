import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets'

function AllAppointments() {

  const { appointments, cancelAppointment, getAllAppointments, calculateAge, aToken } = useContext(AdminContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5 sm:m-8'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-xl font-bold text-slate-800 tracking-tight'>All Appointments</h1>
        <span className='bg-blue-50 text-[#5f6fff] text-xs font-semibold px-3 py-1 rounded-full border border-blue-100'>
          {appointments.length} Total
        </span>
      </div>

      <div className='bg-white border border-slate-100 rounded-2xl shadow-sm text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3.5 px-6 bg-slate-50/80 border-b border-slate-100 font-semibold text-xs text-slate-500 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-xs'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className='text-right sm:text-left'>Action</p>
        </div>

        <div className='divide-y divide-slate-100'>
          {
            appointments.map((item, index) => {
              return (
                <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3.5 px-6 hover:bg-slate-50/80 transition-colors' key={index}>
                  <p className='max-sm:hidden text-slate-400 font-medium'>{index + 1}</p>
                  
                  <div className='flex items-center gap-2.5'>
                    <img className='w-8 h-8 rounded-full object-cover border border-slate-200 bg-slate-100' src={item.userData.image} alt="Patient" /> 
                    <p className='font-medium text-slate-800'>{item.userData.name}</p>
                  </div>

                  <p className='max-sm:hidden text-slate-500'>{item.userData.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>
                  
                  <div className='text-slate-600 text-xs sm:text-sm'>
                    <p className='font-medium text-slate-800'>{slotDateFormat(item.slotDate)}</p>
                    <p className='text-slate-400 text-xs'>{item.slotTime}</p>
                  </div>

                  <div className='flex items-center gap-2.5'>
                    <img className='w-8 h-8 rounded-full object-cover bg-slate-100 border border-slate-200' src={item.docData.image} alt="Doctor" /> 
                    <p className='text-slate-700 text-xs sm:text-sm'>{item.docData.name}</p>
                  </div>

                  <p className='font-semibold text-slate-800'>{currency + item.amount}</p>               
                  
                  <div className='text-right sm:text-left'>
                    {
                      item.cancelled ? 
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-600 border border-rose-100'>
                        Cancelled
                      </span> :
                      item.isCompleted ?
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100'>
                        Completed
                      </span> :
                      <button 
                        onClick={() => cancelAppointment(item._id)} 
                        className='p-1 hover:bg-rose-50 rounded-lg text-rose-500 transition cursor-pointer'
                        title="Cancel Appointment"
                      >
                        <img className='w-7 h-7' src={assets.cancel_icon} alt="Cancel" />
                      </button>
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AllAppointments
