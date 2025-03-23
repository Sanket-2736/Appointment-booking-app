import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios'

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getAllDoctors} = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(null);
  const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors) {
      const doc = doctors.find(doc => doc._id === docId);
      setDocInfo(doc);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (!docInfo) return;
    generateSlots();
  }, [docInfo]);

  const generateSlots = () => {
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        let now = new Date();
        if (now.getHours() >= 21) {
          allSlots.push({ date: currentDate.toDateString(), slots: [] });
          continue;
        }
        currentDate.setHours(Math.max(10, now.getHours()));
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {

        let day = currentDate.getDate();
        let month = currentDate.getMonth();
        let year = currentDate.getFullYear();

        const slotDate = day+"_"+month+"_"+year;

        const slotTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if(isSlotAvailable){
          timeSlots.push({
            datetime: new Date(currentDate),
            time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }        
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push({ date: currentDate.toDateString(), slots: timeSlots });
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to continue!");
      return navigate('/login');
    }
  
    try {
      if (!docSlots.length || !docSlots[slotIndex] || !docSlots[slotIndex].slots.length) {
        toast.error("No available slots. Please select a different date.");
        return;
      }
  
      const selectedSlot = docSlots[slotIndex].slots.find(slot => slot.time === slotTime);
      if (!selectedSlot) {
        toast.error("Please select a valid slot.");
        return;
      }
  
      const date = selectedSlot.datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
  
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const selectedSlotTime = `${hours}:${minutes}`;
  
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime: selectedSlotTime },
        { headers: { token } }
      );
  
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Internal server error! Please try again!");
      console.log("Error in booking appointment: ", error);
    }
  };
  

  return docInfo && (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Doctor's Image */}
      <div className="border-2 border-blue-950 bg-blue-200 rounded-lg p-2">
        <img src={docInfo.image} alt="Doctor" className="w-48 h-48 object-cover rounded-lg" />
      </div>

      {/* Doctor's Details */}
      <div className="w-full max-w-lg border-2 px-5 py-4 border-blue-300 rounded-lg">
        <h1 className="text-2xl font-bold">{docInfo.name}</h1>
        <p className="text-lg font-medium">{docInfo.degree} - {docInfo.speciality}</p>
        <p className="mt-3 font-semibold">About:</p>
        <p className="text-gray-700">{docInfo.about}</p>
        <p className="mt-3 text-lg font-semibold text-blue-900">Appointment Fees: {currencySymbol}{docInfo.fees}</p>
      </div>

      {/* Booking Slots */}
      <div className="w-full max-w-lg">
        <p className="text-center font-medium text-gray-700">Booking slots</p>
        <div className="flex gap-3 items-center overflow-x-auto mt-4 pb-2">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              key={index}
              className={`text-center py-4 px-3 min-w-16 rounded-full cursor-pointer transition duration-300 ${
                slotIndex === index ? 'bg-[#6f5fff] text-white' : 'text-[#6f5fff] border-gray-500 border-2'
              }`}
              onClick={() => setSlotIndex(index)}
            >
              <p>{daysOfWeek[new Date(item.date).getDay()]}</p>
              <p>{new Date(item.date).getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 && docSlots[slotIndex]?.slots.map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`${item.time === slotTime ? 'bg-[#5f6fff] text-white' : 'text-gray-400 border-2 border-gray-300'} text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button onClick={bookAppointment} className='bg-[#5f6fff] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>

      <RelatedDoctors docId={docId}  speciality={docInfo.speciality}/>
    </div>
  );
}

export default Appointment;
