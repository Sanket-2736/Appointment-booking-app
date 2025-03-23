const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');
const cloudinary = require('./config/cloudinary'); // ✅ Import Cloudinary instance
require('dotenv').config();
const adminRouter = require('./routes/adminRoutes');
const doctorRouter = require('./routes/doctorRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.send('Backend API is working correctly!');
});

app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

connectDB(); 

// console.log("Cloudinary Config:", {
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET ? "******" : "Not Set"
// });

app.listen(port, () => {
    console.log('Backend working at: http://localhost:5000');
});
