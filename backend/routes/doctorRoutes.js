const express = require('express')
const doctorRouter = express.Router();
const {doctorsList, docProfile, updateProfile, doctorLogin, getAppointments, docDashBoard, markAsComplete, appointmentCancel} = require('../controllers/doctorController');
const authDoctor = require('../middleware/authDoctor');

doctorRouter.get('/get-doctors', doctorsList);
doctorRouter.get('/get-appointments', authDoctor, getAppointments);
doctorRouter.get('/dashboard', authDoctor, docDashBoard);
doctorRouter.post('/login', doctorLogin);
doctorRouter.post('/mark-as-completed', authDoctor, markAsComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/doctor-profile', authDoctor, docProfile);
doctorRouter.post('/update-profile', authDoctor, updateProfile);

module.exports = doctorRouter;