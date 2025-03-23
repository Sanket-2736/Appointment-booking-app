// const Razorpay = require('razorpay');
require('dotenv').config();
const doctorModel = require('../models/doctorModel')
require('dotenv').config();
const jwt = require('jsonwebtoken')
const validator = require('validator');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const {v2 : cloudinary} = require('cloudinary');
const appointmentModel = require('../models/appointmentModel');

const registerUser = async (req, res) => {
    try {
        const {email, name, password, phone} = req.body;

        if(!email || !password || !name || !phone){
            console.log(req.body);
            return res.json({
                success: false,
                message: "Some credentials missing, check again!"
            });
        }

        const isEmailValid = validator.isEmail(email);

        if(!isEmailValid){
            console.log("Invalid email!");
            return res.json({
                success: false,
                message: "Invalid email!"
            });
        }

        const userEmail = await userModel.findOne({email});
        if(userEmail){
            console.log('User already exists: ', userEmail);
            return res.json({
                success: false,
                message: "User already exists!"
            });
        }        

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name, email, password : hashedPassword, phone
        }

        const newUser = new userModel(userData)
        const user = await newUser.save();
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

        return res.json({
            success: true,
            message: "User created successfully!",
            token
        })

    } catch (error) {
        console.log("Error in adding user: ", error);
        return res.json({
            success: false,
            message: "Internal server error! Please try again."
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log(req.body);
            return res.json({
                success: false,
                message: "Please enter both email and password!"
            });
        }

        const user = await userModel.findOne({ email }); 

        if (!user) {
            return res.json({
                success: false,
                message: "User not found!"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password!"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({
            success: true,
            token
        });
    } catch (error) {
        console.log("Error in user login: ", error);
        return res.json({
            success: false,
            message: "Internal server error! Please try again."
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId).select('-password');
        return res.json({success: true, userData});
    } catch (error) {
        console.log("Error in fetching profile data: ", error);
        return res.json({
            success: false,
            message: "Internal server error! Please try again."
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const {name, phone, address, dob, gender} = req.body;
        const userId = req.body.userId;
        const imageFile = req.file;
        console.log(req.body);
        console.log("user id: ", userId)

        if(imageFile){
            console.log("Image file found!")
        }

        console.log(req.body)
        console.log(userId);

        if(!name || !phone || !dob || !gender){
            return res.json({
                success: false,
                message: "Please fill all the fields."
            });
        }

        await userModel.findByIdAndUpdate(userId, { 
            name, 
            phone, 
            address: address ? JSON.parse(address) : {},
            dob, 
            gender 
        });

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, {image: imageUrl});
        }

        const user = await userModel.findById(userId)

        return res.json({
            success: true,
            message: "Profile updated successfully.",
            user
        })

    } catch (error) {
        console.log("Error in updating profile data: ", error);
        return res.json({
            success: false,
            message: "Internal server error! Please try again."
        });
    }
}

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        console.log("Received Request:", req.body);

        const docData = await doctorModel.findById(docId).select('-password');
        console.log("Doctor Data:", docData);

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available for this slot." });
        }

        let slots_booked = docData.slots_booked || {};

        console.log("Slots Booked Before:", slots_booked);

        if (slots_booked[slotDate]?.includes(slotTime)) {
            return res.json({ success: false, message: "Current slot is not available." });
        }

        slots_booked[slotDate] = slots_booked[slotDate] || [];
        slots_booked[slotDate].push(slotTime);

        console.log("Updated Slots Booked:", slots_booked);

        const userData = await userModel.findById(userId).select('-password');

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        return res.json({ success: true, message: "Appointment booked successfully!" });

    } catch (error) {
        console.log("Error in booking appointment:", error);
        return res.json({ success: false, message: "Internal server error! Please try again." });
    }
};

const listAppointment = async (req, res) => {
    try {
        const {userId} = req.body;
        const appointments = await appointmentModel.find({userId});

        res.json({
            success: true,
            appointments  
        })
    } catch (error) {
        console.log("Error in listing appointment:", error);
        return res.json({ success: false, message: "Internal server error! Please try again." });
    }
}

const cancelRequirements = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment not found!"
            });
        }

        if (appointmentData.userId !== userId) {
            return res.json({
                success: false,
                message: "Unauthorized action!"
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
        console.log("Error in cancelling appointment:", error);
        return res.json({ success: false, message: "Internal server error! Please try again." });
    }
};

// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID || "",
//     key_secret: process.env.RAZORPAY_KEY_SECRET || ""
// });



const paymentRazorpay = async (req, res) => {
    try {
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if(!appointmentData || appointmentData.cancelled){
            return res.json({
                success: false,
                message: "Appointment not found or cancelled."
            });
        }

        const options = {
            amount : appointmentData.amount * 100,
            currency : process.env.CURRENCY,
            reciept : appointmentId
        }

        const order = await razorpayInstance.orders.create(options);

        return res.json({
            success: true,
            order
        })
    } catch (error) {
        console.log("Error in making payment of appointment:", error);
        return res.json({ success: false, message: "Internal server error! Please try again." });
    }
}

const verifyPayment = async (req, res) => {
    try {
        const {razorpay_order_id}         = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log(orderInfo);

        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});

            return res.json({
                success : true,
                message : "Payment successful."
            });
        } else {
            return res.json({
                success: false,
                message: "Payment failed."
            })
        }
    } catch (error) {
        console.log("Error in verifying payment of appointment:", error);
        return res.json({ success: false, message: "Internal server error! Please try again." });
    }
}

module.exports = {
    registerUser, verifyPayment, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelRequirements, paymentRazorpay
}