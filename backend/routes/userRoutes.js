const express = require('express');
const userRouter = express.Router();
const { registerUser, loginUser, getProfile, verifyPayment, updateProfile, paymentRazorpay, bookAppointment, listAppointment, cancelRequirements} = require('../controllers/userController');
const authUser = require('../middleware/authUser');  // Move this to the top
const upload = require('../middleware/multer');

userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.get('/appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelRequirements);
userRouter.post('/payment-razorpay', authUser, paymentRazorpay);
userRouter.post('/verify-payment', authUser, verifyPayment);

module.exports = userRouter;
