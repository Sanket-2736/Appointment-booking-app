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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        All Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-blue-50 shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-700">
              {doctor.name}
            </h2>
            <p className="text-gray-600">{doctor.speciality}</p>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={doctor.available}
                className="w-5 h-5 accent-green-500"
                readOnly
                onChange={() => changeAvailability(doctor._id)}
              />
              <span className="ml-2 text-gray-700 font-medium">
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
