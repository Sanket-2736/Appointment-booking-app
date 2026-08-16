import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken'));
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/all-doctors', {headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Internal server error, try again!');
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/change-availability', {docId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Internal server error!");
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments', {headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Internal server error!");
        }
    }

    const calculateAge = (dob) => {
        const today = new Date();
        const birthdate = new Date(dob);

        let age = today.getFullYear() - birthdate.getFullYear();
        return age;
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}});
            if(data.success){
                toast.success(data.message);
                getAllAppointments()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Internal server error!")
        }
    }

    const fetchDashData = async () =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard', {headers:{aToken}});
            if(data.success){
                setDashData(data.dashData);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message || "Internal server error!");
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl,
        getAllDoctors, doctors,
        changeAvailability, getAllAppointments,
        appointments, setAppointments,
        calculateAge, cancelAppointment,
        fetchDashData, dashData
    }

    return <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
}

export default AdminContextProvider;