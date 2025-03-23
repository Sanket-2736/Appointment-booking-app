import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "./AdminContext";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken'));
    const {calculateAge} = useContext(AdminContext);
    const [profileData, setProfileData] = useState(false)
    const [dashData, setDashData] = useState(false);

    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/get-appointments',{headers:{dToken}});
            if(data.success){
                setAppointments(data.appointments.reverse());
                console.log(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Internal server error! Try again later.")
            console.log("Error in fetching appointments: ", error)
        }
    }

    const markAsComplete = async (appointmentId) => {
        const {data} = await axios.post(backendUrl+'/api/doctor/mark-as-completed', {appointmentId}, {headers:{dToken}});
        try {
            if(data.success){
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        const {data} = await axios.post(backendUrl+'/api/doctor/cancel-appointment', {appointmentId}, {headers:{dToken}});
        try {
            if(data.success){
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        const {data} = await axios.get(backendUrl+'/api/doctor/dashboard', {headers:{dToken}});
        try {
            if(data.success){
                setDashData(data.dashData);
                console.log(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        const {data} = await axios.get(backendUrl+'/api/doctor/doctor-profile', {headers:{dToken}});
        try {
            if(data.success){
                setProfileData(data.profileData);
                console.log(data.profileData);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        dToken, setDToken,backendUrl,
        appointments, setAppointments, getAppointments, calculateAge,
        markAsComplete, cancelAppointment,
        getDashData, dashData, setDashData,
        getProfileData, profileData, setProfileData
    }

    return <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
}

export default DoctorContextProvider;