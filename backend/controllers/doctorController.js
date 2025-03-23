const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const bcrypt = require('bcrypt');
const appointmentModel = require('../models/appointmentModel');

const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {available : !docData.available});

        return res.json({
            success : true,
            message: "Availability updated!"
        });
    } catch (error) {
        console.log("Error in changing availability: ", error);
        return res.json({
            success : false, 
            message: "Internal server error! Please try again."
        })
    }
}

const doctorsList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])

        return res.json({
            success : true, 
            doctors
        });
    } catch (error) {
        console.log("Error in fetching doctors list: ", error);
        return res.json({
            success : false, 
            message: "Internal server error! Please try again."
        })
    }
}

const doctorLogin = async (req, res) => {
    try {
        
        const {email, password} = req.body;

        const doctor  = await doctorModel.findOne({email});
        if(!doctor){
            return res.json({
                success : false,
                message: "Invalid email or password!"
            });
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(!isMatch){
            return res.json({
                success : false,
                message: "Invalid email or password!"
            });
        }

        const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET);
        return res.json({
            success : true,
            token,
            message : "Login successfull!"
        });

    } catch (error) {
        console.log("Error in doctor login: ", error);
        return res.json({
            success : false, 
            message: "Internal server error! Please try again."
        });
    }
}

const getAppointments = async (req, res) => {
    try {
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId});

        return res.json({
            success : true,
            appointments
        })
    } catch (error) {
        console.log("Error in fetching doctor appointments: ", error);
        return res.json({
            success : false, 
            message: "Internal server error! Please try again."
        });
    }
}

const markAsComplete = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted : true});
            return res.json({
                success : true,
                message : "Appointment completed!"
            });
        }

        return res.json({
            success : false,
            message : "Mark failed!"
        })
    } catch (error) {
        console.log("Error in marking appointment complete: ", error);
        return res.json({
            success : false, 
            message: "Internal server error! Please try again."
        });
    }
}

const appointmentCancel = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled : true});
            return res.json({
                success : true,
                message : "Appointment cancelled!"
            });
        }

        return res.json({
            success : false,
            message : "Cancellation failed!"
        })
    } catch (error) {
        console.log("Error in cancelling appointment: ", error);
        return res.json({
            success : false, 
            message: "Internal server error! Please try again."
        });
    }
}

const docDashBoard = async (req, res) => {
    try {
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId});
        let earnings = 0;

        appointments.map((item) =>{
            if(item.isCompleted || item.payment){
                earnings += item.amount;
            }
        });

        let patients = [];

        appointments.map((item) => {
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments : appointments.reverse().slice(0, 5)
        }

        return res.json({
            success : true,
            dashData,
            message: "Dashboard data fetched successfully!"
        })
    } catch (error) {
        console.log("Error in fetching doctor dashboard: ", error);
        return res.json({
            success : false, 
            message: "Internal server error! Please try again."
        });
    }
}

const docProfile = async (req, res) =>{
    try {
        const {docId} = req.body;
        const profileData = await doctorModel.findById(docId).select("-password");

        return res.json({
            success : true,
            profileData,
            message: "Doctor profile fetched successfully!"
        })
    } catch (error) {
        console.log("Error in fetching doctor profile: ", error);
        return res.json({
            success : false, 
            message: "Internal server error! Please try again."
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const {docId, fees, address, available} = req.body;
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available});
        return res.json({
            success : true,
            message: "Doctor profile updated successfully!"
        })
    } catch (error) {
        console.log("Error in updating doctor profile: ", error);
        return res.json({
            success : false, 
            message: "Internal server error! Please try again."
        });
    }
}

module.exports = {
    changeAvailability, docProfile, updateProfile, docDashBoard, doctorsList, doctorLogin, getAppointments, markAsComplete, appointmentCancel
}