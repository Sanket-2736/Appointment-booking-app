# 🩺 Prescripto - Full Stack Doctor Appointment Booking Platform

Prescripto is a modern, full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application designed to streamline doctor appointment booking, patient healthcare discovery, doctor schedule management, and administrative control.

---

## ✨ Features Breakdown

### 👤 Patient / User Portal (`/frontend`)
- **Doctor Directory & Filtering:** Browse verified healthcare specialists filtered by medical domain (General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist).
- **Interactive Booking Engine:** Select available date slots and time windows with real-time slot conflict prevention.
- **My Appointments Management:** View upcoming, completed, and cancelled appointments with status pills.
- **Online Payment Integration:** Integrated **Razorpay** checkout for secure appointment fee payment.
- **Health & Wellness Digest:** Interactive medical articles blog featuring category filters, author doctor cards, and modal reading views.
- **User Profile:** Update personal contact info, profile photo, and address details.

### 🩺 Doctor Management Portal (`/admin`)
- **Doctor Dashboard:** Overview metrics detailing total revenue/earnings, total unique patients, total appointments, and latest booking logs.
- **Appointment Controls:** Mark patient consultations as completed or cancel appointments with dynamic slot releasing.
- **Doctor Profile Editing:** Update consultation fees, bio details, and toggle real-time availability status.
- **Demo Access:** 1-Click login helper for interview demonstration.

### 🛡️ Admin Portal (`/admin`)
- **System Metrics Dashboard:** Real-time metrics showing registered doctors, total system patients, total appointments, and recent booking logs.
- **Doctor Onboarding Manager:** Register new doctors with image uploads directly integrated with **Cloudinary**.
- **All Appointments Master List:** Full administrative oversight of all bookings across all doctors with cancellation authority.

---

## 🛠️ Tech Stack & Architecture

### **Frontend & Admin Applications**
- **Framework:** React.js (Vite)
- **Styling:** TailwindCSS with modern gradient glassmorphism UI & Google Fonts (Poppins)
- **Routing:** React Router DOM (v6)
- **HTTP Client:** Axios
- **Notifications:** React Toastify

### **Backend Application**
- **Runtime:** Node.js & Express.js
- **Database:** MongoDB & Mongoose ORM
- **Authentication & Security:** JSON Web Tokens (JWT), BcryptJS password hashing, CORS, Dotenv
- **File Uploads & Media Storage:** Multer & Cloudinary API
- **Payment Processing:** Razorpay API

---

## 🔑 Interview & Testing Demo Credentials

For quick evaluation and testing, pre-configured demo credentials are embedded with 1-click auto-fill helpers on the login screens:

| Portal | Role | Email | Password |
| :--- | :--- | :--- | :--- |
| Admin Panel | System Administrator | `admin@prescripto.com` | `qqmxw4s5` |
| Doctor Panel | Certified Specialist | `sneha.kulkarni@example.com` | `sneha.kulkarni` |

---

## 📁 Repository Structure

```
Doctor Appointment Booking App/
├── backend/                  # Express.js REST API server
│   ├── config/               # MongoDB & Cloudinary configurations
│   ├── controllers/          # Admin, Doctor, and User business logic
│   ├── middleware/           # JWT Authentication (authUser, authDoctor, authAdmin)
│   ├── models/               # Mongoose Schemas (User, Doctor, Appointment)
│   ├── routes/               # Express API Endpoint routes
│   └── server.js             # Server entry point
├── frontend/                 # React User Application
│   ├── src/
│   │   ├── assets/           # UI Icons & static assets
│   │   ├── components/       # Reusable UI components (Navbar, Header, Footer, Banner)
│   │   ├── context/          # Global App State Context
│   │   └── pages/            # Home, Doctors, Appointment, HealthBlog, Profile, Login
└── admin/                    # React Admin & Doctor Management App
    ├── src/
    │   ├── context/          # AdminContext & DoctorContext
    │   └── pages/            # Dashboard, AllAppointments, AddDoctor, DoctorProfile, Login
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Admin Master Credentials
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=qqmxw4s5

# Cloudinary Setup
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Integration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
RAZORPAY_KEY_ID=your_razorpay_key_id
```

Create a `.env` file in the `admin/` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Sanket-2736/Appointment-booking-app.git
cd "Appointment-booking-app"
```

### 2. Install & Start Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Install & Start Frontend (User App)
```bash
# In a new terminal window
cd frontend
npm install
npm run dev
```

### 4. Install & Start Admin Application
```bash
# In a new terminal window
cd admin
npm install
npm run dev
```

---

## 👨‍💻 Author

**Sanket K. Belekar**  
Full Stack Developer | MERN Stack Specialist  
[GitHub Profile](https://github.com/Sanket-2736)

---

## 📄 License
This project is open-source and available under the [ISC License](LICENSE).
