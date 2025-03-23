const express = require('express')
const adminRouter = express.Router();
const {addDoctor, adminDashBoard, loginAdmin, allDoctors, cancelAppointment, appointmentsAdmin} = require('../controllers/adminController');
const upload = require('../middleware/multer');
const authADmin = require('../middleware/authADmin');
const { changeAvailability } = require('../controllers/doctorController');

adminRouter.post('/add-doctor', upload.single('image'), authADmin, addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/all-doctors', authADmin, allDoctors);
adminRouter.post('/change-availability', authADmin, changeAvailability);
adminRouter.post('/cancel-appointment', authADmin, cancelAppointment);
adminRouter.get("/appointments", authADmin, appointmentsAdmin);
adminRouter.get("/dashboard", authADmin, adminDashBoard);

module.exports = adminRouter;