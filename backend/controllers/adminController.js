const jwt = require('jsonwebtoken')
const doctorModel = require('../models/doctorModel')
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcryptjs')
const validator = require('validator');
const appointmentModel = require('../models/appointmentModel');
const userModel = require('../models/userModel');
const addDoctor = async (req, res) => {
    try {
        const {email, name, password, speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;

        if(!name || !password || !email || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({
                success : false,
                message : "Some details missing!",
            });
        }

        if(!imageFile){
            return res.json({
                success : false,
                message : "Image file missing!",
            });
        }

        if(!validator.isEmail(email)){
            return res.json({
                success : false,
                message : "Invalid email format!",
            });
        }

        if(password.length < 8){
            return res.json({
                success : false,
                message : "Password must have atleast 8 characters!",
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type : "image"
        });

        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name, email, image: imageUrl, password : hashedPassword, speciality, degree, experience, about, fees, address, date: Date.now()
        }

        const newDoc = new doctorModel(doctorData);
        await newDoc.save();

        return res.json({
            success : true,
            message : "Doctor Registration successful!"
        })

    } catch (error) {
        console.error("Error in adding doctor: ", error);
        return res.json({
            success : false, 
            message : "Internal server error! Try again later."
        });
    }
}

const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(process.env.ADMIN_EMAIL != email || process.env.ADMIN_PASSWORD != password){
            return res.json({
                success : false, 
                message : "Admin credentials invalid!"
            });
        }

        const token = jwt.sign(email+password, process.env.JWT_SECRET);
        return res.json({
            success : true,
            token
        });
        
    } catch (error) {
        console.error("Error in admin login: ", error);
        return res.json({
            success : false, 
            message : "Internal server error! Try again later."
        });
    }
}

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        return res.json({
            success : true,
            doctors
        })
    } catch (error) {
        console.error('Error in fetching doctors: ', error);
        return res.json({
            success : false,
            message : "Internal server error! Try again later."
        })
    }
}

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        return res.json({
            success : true,
            appointments
        })
    } catch (error) {
        console.error("Error in fetching appointments: ", error);
        return res.json({
            success : false,
            message : "Internal server error! Try again later."
        })
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment not found!"
            });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Updating doctor details
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        if (!doctorData) {
            return res.json({
                success: false,
                message: "Doctor not found!"
            });
        }

        let slots_booked = { ...doctorData.slots_booked }; // Clone object

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

            // If no slots remain, delete the date entry to avoid empty arrays
            if (slots_booked[slotDate].length === 0) {
                delete slots_booked[slotDate];
            }
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        return res.json({
            success: true,
            message: "Appointment cancelled successfully!"
        });

    } catch (error) {
        console.error("Error in cancelling appointment:", error);
        return res.json({ success: false, message: "Internal server error! Please try again." });
    }
};

const adminDashBoard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password")
        const users = await userModel.find({}).select("-password")
        const appointments = await appointmentModel.find({}).select("-password")

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments : [...appointments].reverse().slice(0, 5)
        }

        return res.json({
            success: true,
            dashData,
            message : "Data fetched successfully!"
        })
    } catch (error) {
        console.error("Error in fetching information:", error);
        return res.json({ success: false, message: "Internal server error! Please try again." });
    }
}

module.exports = {
    addDoctor, loginAdmin, allDoctors, appointmentsAdmin, cancelAppointment, adminDashBoard
}