import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'

function MyAppointments() {
  const { backendUrl, token, getAllDoctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.slice().reverse()); // Avoid direct mutation
        toast.success("Appointments fetched successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      toast.error(error.response?.data?.message || "Internal server error! Try again later.");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Appointment cancelled successfully!");
        await getAppointments();
        await getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      toast.error(error.response?.data?.message || "Internal server error! Try again later.");
    }
  };

  const appointmentPayment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay', {appointmentId}, {headers:{token}});

      if(data.success){
        toast.success("Payment successfull");
        console.log(data.order);
        initPay(data.order);
      }
    } catch (error) {
      console.error("Failed to make payment :", error);
      toast.error(error.response?.data?.message || "Internal server error! Try again later.");
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "AppointmentPayment",
      order_id : order.id,
      receipt : order.receipt,
      handler : async (res) => {
        console.log(res);
        try {
          const {data} = await axios.post(backendUrl+'/api/user/verify-payment', res, {headers:{token}});

          if(data.success){
            await getAppointments();
            navigate('/my-appointments')
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  useEffect(() => {
    if (token) getAppointments();
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>

      <div>
        {appointments.map((item) => {
          const doctor = item.docData;
          let address = { line1: "", line2: "" };

          try {
            address = typeof doctor.address === "string" ? JSON.parse(doctor.address) : doctor.address;
          } catch (error) {
            console.error("Error parsing address:", error);
          }

          return (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex py-2 border-b" key={item._id}>
              <div>
                <img className="w-32 bg-indigo-50" src={doctor.image} alt={doctor.name} />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{doctor.name}</p>
                <p>{doctor.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{address.line1}</p>
                <p className="text-xs">{address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700">Date & Time: </span>
                  {item.slotDate} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                {
                  !item.cancelled && item.payment && <button className="text-sm text-center sm:min-w-48 py-2 border text-white transition-all duration-300 rounded-xl bg-[#5f6fff]">
                                        Paid
                                      </button>
                }
                {
                  !item.cancelled && <button onClick={() => appointmentPayment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:text-white transition-all duration-300 rounded-xl hover:bg-[#5f6fff]">
                                        Pay Online
                                      </button>
                }
                {
                  !item.cancelled && <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:text-white transition-all duration-300 rounded-xl hover:bg-red-500"
                >
                  Cancel
                </button>
                }
                {
                  item.cancelled && <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:text-black transition-all duration-300 rounded-xl hover:bg-yellow-500">Cancelled</button>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyAppointments;
