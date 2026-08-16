import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';

function Dashboard() {

  const { fetchDashData, dashData, aToken, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) fetchDashData();
  }, [aToken])

  return dashData && (
    <div className='m-5 sm:m-8 w-full max-w-6xl'>
      
      {/* Metrics Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8'>
        <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer'>
          <div className='p-3 bg-blue-50 rounded-xl'>
            <img className='w-10 h-10 object-contain' src={assets.doctor_icon} alt="Doctors Icon" />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-800'>{dashData.doctors}</p>
            <p className='text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5'>Total Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer'>
          <div className='p-3 bg-indigo-50 rounded-xl'>
            <img className='w-10 h-10 object-contain' src={assets.appointment_icon} alt="Appointments Icon" />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-800'>{dashData.appointments}</p>
            <p className='text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5'>Total Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer'>
          <div className='p-3 bg-emerald-50 rounded-xl'>
            <img className='w-10 h-10 object-contain' src={assets.patients_icon} alt="Patients Icon" />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-800'>{dashData.patients}</p>
            <p className='text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5'>Total Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings Card */}
      <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
        <div className='flex items-center gap-3 px-6 py-4 bg-slate-50/50 border-b border-slate-100'>
          <img className='w-5 h-5 opacity-70' src={assets.list_icon} alt="List Icon" />
          <h2 className='font-semibold text-slate-800 text-base'>Latest Bookings</h2>
        </div>

        <div className='divide-y divide-slate-100'>
          {
            dashData.latestAppointments.map((item, index) => {
              return (
                <div className='flex items-center px-6 py-3.5 gap-4 hover:bg-slate-50/80 transition-colors' key={index}>
                  <img className='rounded-full w-10 h-10 object-cover border border-slate-200 bg-slate-100' src={item.docData.image} alt="Doctor" />
                  <div className='flex-1 text-sm'>
                    <p className='text-slate-800 font-medium'>{item.docData.name}</p>
                    <p className='text-slate-500 text-xs mt-0.5'>Booking for {slotDateFormat(item.slotDate)}</p>
                  </div>
                  {
                    item.cancelled ? 
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-100">
                      Cancelled
                    </span> : 
                    item.isCompleted ?
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      Completed
                    </span> :
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer title="Cancel Appointment"'
                    >
                      <img src={assets.cancel_icon} alt="Cancel" className='w-7 h-7' />
                    </button>
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
