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
        const {data} = await axios.get(backendUrl+'/api/admin/all-doctors', {headers:{aToken}})
        try {
            if(data.success){
                setDoctors(data.doctors);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Internal server error, try again!');
            console.log(data.message)
        }
    }

    const changeAvailability = async (docId) => {
        const {data} = await axios.post(backendUrl+'/api/admin/change-availability', {docId}, {headers:{aToken}})

        try {
            console.log(data);
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Internal server error!");
            console.log("Error in changing availability: ", error);
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments', {headers:{aToken}})
            if(data.success){
                console.log(data.appointments)
                setAppointments(data.appointments)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Internal server error!");
            console.log("Error in fetching appointments: ", error);
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
        const {data} = await axios.get(backendUrl+'/api/admin/dashboard', {headers:{aToken}});
        try {
            console.log(data) 
            if(data.success){
                setDashData(data.dashData);
                toast.success("Data fetched successfully!")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message || "Internal server error!");
            console.log("Error in fetching data: ", error)
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