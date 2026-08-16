import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

function DoctorsList() {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 sm:m-8 w-full max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">All Doctors</h1>
          <p className="text-slate-500 text-xs mt-0.5">Manage doctor profiles and availability</p>
        </div>
        <span className="bg-blue-50 text-[#5f6fff] text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
          {doctors.length} Registered
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center group relative overflow-hidden"
          >
            <div className="relative mb-3">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 object-cover rounded-full border-2 border-blue-100 bg-slate-50 shadow-xs group-hover:scale-105 transition-transform duration-300"
              />
              <span 
                className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                  doctor.available ? "bg-emerald-500" : "bg-slate-300"
                }`}
              />
            </div>
            
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              {doctor.name}
            </h2>
            
            <span className="mt-1 px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
              {doctor.speciality}
            </span>

            <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={doctor.available}
                  onChange={() => changeAvailability(doctor._id)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5f6fff]"></div>
              </label>
              <span className={`text-xs font-medium ${doctor.available ? "text-emerald-600" : "text-slate-400"}`}>
                {doctor.available ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsList;
