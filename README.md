<div align="center">

# 🏥 Hospital Management System

**A production-ready, full-stack doctor appointment booking platform**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A three-panel healthcare platform where **patients book appointments**, **doctors manage schedules**, and **admins control the entire system** — with Razorpay payments, Cloudinary image storage, and role-based JWT authentication.

[Report Bug](https://github.com/shahidamzad/Hospital-Management-System/issues) · [Request Feature](https://github.com/shahidamzad/Hospital-Management-System/issues)

---

![Prescripto - Book Appointment With Trusted Doctors](https://github.com/user-attachments/assets/0b00b871-b3df-4c9d-91b7-fd3447fd8402)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Workflows](#workflows)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Hospital Management System (branded as **Prescripto**) is a **monorepo** containing three independently deployable applications:

| App | Path | Description |
|---|---|---|
| Patient App | `/client` | Public-facing UI for patients |
| Admin & Doctor Dashboard | `/admin` | Internal dashboard for staff |
| REST API | `/backend` | Shared backend for both apps |

All three share a single MongoDB database and communicate via a JWT-authenticated REST API.

---

## Screenshots

### Patient App

**Home Page**
![Home Page](https://github.com/user-attachments/assets/0b00b871-b3df-4c9d-91b7-fd3447fd8402)

**Doctors Listing — Browse by Speciality**
![Doctors Listing](https://github.com/user-attachments/assets/2e4a5442-9511-4953-83c9-ec131127c69a)

**My Appointments — Payment & Status Tracking**
![My Appointments](https://github.com/user-attachments/assets/ce08ad48-c61b-4f4f-8d92-cc948701c33d)

**Razorpay Payment — Successful Transaction**
![Razorpay Payment](https://github.com/user-attachments/assets/2881b4e3-1dc3-4d01-b10f-7c7461cdef0c)

---

### Admin & Doctor Dashboards

| Doctor Dashboard | Admin Dashboard |
|---|---|
| ![Doctor Dashboard](https://github.com/user-attachments/assets/REPLACE_WITH_DOCTOR_DASHBOARD_IMAGE_LINK) | ![Admin Dashboard](https://github.com/user-attachments/assets/REPLACE_WITH_ADMIN_DASHBOARD_IMAGE_LINK) |

---

## Features

### 👤 Patient Panel
- Register, login, and manage personal profile (name, photo, DOB, gender, phone, address)
- Browse doctors filtered by **7 specialities** (General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist, and more)
- View doctor profiles: qualifications, experience, fees, and real-time slot availability
- Book time-slotted appointments and pay online via **Razorpay**
- Cancel appointments with **automatic refund initiation**
- View full appointment history with payment and completion status

### 🩺 Doctor Panel
- Secure login with dedicated JWT token scope
- View all appointments (upcoming, completed, cancelled)
- Mark appointments as **completed** or **cancelled**
- Personal dashboard showing earnings and patient count
- Update profile details and toggle availability on/off

### 🛠️ Admin Panel
- Add doctors with profile photo upload (stored on **Cloudinary**)
- Manage the full doctor roster — view, activate/deactivate
- View and cancel **any** appointment across the platform
- Platform-wide dashboard: total doctors, appointments, patients

### 🔐 Authentication & Security
- Three separate JWT scopes: `user`, `doctor`, `admin`
- Dedicated auth middleware per role — no shared tokens
- Passwords hashed with **bcrypt**
- Input validation via `validator` library on registration

---

## Tech Stack

### Frontend — `/client` & `/admin`

| Package | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 8.x | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| React Router DOM | 7.x | Client-side routing |
| Axios | 1.x | HTTP client |
| React Toastify | 11.x | Toast notifications |

### Backend — `/backend`

| Package | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 5.x | Web framework |
| MongoDB + Mongoose | 9.x | Database & ODM |
| JSON Web Token | 9.x | Authentication |
| bcrypt | 6.x | Password hashing |
| Multer | 2.x | Multipart file parsing |
| Cloudinary SDK | 2.x | Cloud image storage |
| Razorpay SDK | 2.x | Payment gateway |
| Validator | 13.x | Input sanitization |
| Dotenv | 17.x | Environment config |

---

## System Architecture

```
┌──────────────────────┐     ┌──────────────────────┐
│     Client App       │     │      Admin App        │
│  (Patient Frontend)  │     │  (Doctor + Admin UI)  │
└──────────┬───────────┘     └──────────┬────────────┘
           │                            │
           │         HTTPS / REST       │
           └──────────────┬─────────────┘
                          │
              ┌───────────▼────────────┐
              │     Express Server     │
              │  ┌─────────────────┐   │
              │  │  Auth Middleware │   │
              │  │  (JWT per role) │   │
              │  └────────┬────────┘   │
              │  ┌────────▼────────┐   │
              │  │   Controllers   │   │
              │  │  Admin │ Doctor │   │
              │  │        │  User  │   │
              │  └────────┬────────┘   │
              │  ┌────────▼────────┐   │
              │  │   Integrations  │   │
              │  │  Cloudinary     │   │
              │  │  Razorpay       │   │
              │  └────────┬────────┘   │
              └───────────┼────────────┘
                          │
              ┌───────────▼────────────┐
              │        MongoDB         │
              │  users │ doctors       │
              │        │ appointments  │
              └────────────────────────┘
```

---

## Database Schema

### `Doctor`
| Field | Type | Notes |
|---|---|---|
| name, email, password | String | Required; password hashed |
| image | String | Cloudinary URL |
| speciality, degree, experience | String | Required |
| fees | String | Consultation fee |
| available | Boolean | Toggle via admin/doctor |
| slots_booked | Object | Map of date → booked times |
| address | Object | Address lines |

### `User` (Patient)
| Field | Type | Notes |
|---|---|---|
| name, email, password | String | Required; password hashed |
| image | String | Profile photo URL |
| gender, dob, phone | String | Optional profile fields |
| address | Object | `{ line1, line2 }` |

### `Appointment`
| Field | Type | Notes |
|---|---|---|
| userId, docId | String | References to User & Doctor |
| slotDate, slotTime | String | Booked slot |
| amount | Number | Fee at time of booking |
| payment | Boolean | Payment status |
| isCompleted, cancelled | Boolean | Appointment state |
| razorpay_payment_id | String | For refund processing |
| refund | Object | `{ status, amount, refundId, initiatedAt }` |

---

## Project Structure

```
Hospital-Management-System/
│
├── client/                          # Patient-facing React app
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Doctors.jsx          # Browse & filter by speciality
│   │   │   ├── Appointment.jsx      # Book a slot
│   │   │   ├── MyAppointments.jsx   # Patient appointment history
│   │   │   ├── MyProfile.jsx        # Edit patient profile
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Login.jsx
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── TopDoctors.jsx
│   │   │   ├── Speciality.jsx
│   │   │   ├── Banner.jsx
│   │   │   └── RelatedDoctors.jsx
│   │   ├── Context/
│   │   │   └── appContext.jsx       # Global state (doctors, user data)
│   │   └── assets/
│   └── package.json
│
├── admin/                           # Admin + Doctor dashboard React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── AddDoctor.jsx
│   │   │   │   ├── DoctorList.jsx
│   │   │   │   └── AllAppointment.jsx
│   │   │   └── Doctor/
│   │   │       ├── DoctorDashboard.jsx
│   │   │       ├── DoctorAppointments.jsx
│   │   │       └── DoctorProfile.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   └── context/
│   │       ├── AdminContext.jsx
│   │       ├── DoctorContext.jsx
│   │       └── AppContext.jsx
│   └── package.json
│
├── backend/                         # Express REST API
│   ├── config/
│   │   ├── db.js                    # Mongoose connection
│   │   └── cloudinary.js            # Cloudinary config
│   ├── controllers/
│   │   ├── admin.Controller.js
│   │   ├── doctor.Controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── authAdmin.js             # JWT scope: admin
│   │   ├── authDoctor.js            # JWT scope: doctor
│   │   ├── authUser.js              # JWT scope: user
│   │   └── multer.js                # File upload config
│   ├── models/
│   │   ├── doctorModel.js
│   │   ├── userModel.js
│   │   └── appointmentModel.js
│   ├── routes/
│   │   ├── admin.route.js
│   │   ├── doctor.route.js
│   │   └── user.route.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Razorpay account (Test mode works for local dev)

### 1. Clone the Repository

```bash
git clone https://github.com/shahidamzad/Hospital-Management-System.git
cd Hospital-Management-System
```

### 2. Install Dependencies

```bash
# Backend
cd backend && npm install

# Patient app
cd ../client && npm install

# Admin & Doctor dashboard
cd ../admin && npm install
```

### 3. Configure Environment Variables

See [Environment Variables](#environment-variables) section below.

### 4. Run the Apps

Open **three terminal windows**:

```bash
# Terminal 1 — Backend API
cd backend && npm run dev

# Terminal 2 — Patient App (http://localhost:5173)
cd client && npm run dev

# Terminal 3 — Admin Dashboard (http://localhost:5174)
cd admin && npm run dev
```

---

## Environment Variables

### `/backend/.env`

```env
# Server
PORT=4000

# Database
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hms

# Auth
JWT_SECRET=your_strong_jwt_secret

# Admin credentials (hardcoded single admin)
ADMIN_EMAIL=admin@hospital.com
ADMIN_PASSWORD=your_admin_password

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### `/client/.env` and `/admin/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
```

> ⚠️ Never commit `.env` files. Both `/client/.env`, `/admin/.env`, and `/backend/.env` are already listed in `.gitignore`.

---

## API Reference

All endpoints are prefixed with the base URL (e.g. `http://localhost:4000`).

Authentication headers:
- Admin routes → `atoken: <admin_jwt>`
- Doctor routes → `dtoken: <doctor_jwt>`
- User routes → `token: <user_jwt>`

### Admin — `/api/admin`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/login` | ❌ | Admin login |
| `POST` | `/add-doctor` | ✅ | Add doctor with photo |
| `POST` | `/all-doctors` | ✅ | List all doctors |
| `POST` | `/change-availability` | ✅ | Toggle doctor availability |
| `GET` | `/all-appointments` | ✅ | All appointments on platform |
| `POST` | `/cancel-appointment` | ✅ | Cancel any appointment |
| `GET` | `/dashboard` | ✅ | Platform analytics |

### Doctor — `/api/doctor`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/login` | ❌ | Doctor login |
| `POST` | `/list` | ❌ | Get all doctors (public) |
| `GET` | `/appointments` | ✅ | Doctor's appointment list |
| `POST` | `/complete-appointment` | ✅ | Mark appointment complete |
| `POST` | `/cancel-appointment` | ✅ | Cancel appointment |
| `GET` | `/dashboard` | ✅ | Doctor's personal stats |
| `GET` | `/profile` | ✅ | Get doctor profile |
| `POST` | `/update-profile` | ✅ | Update doctor profile |

### User — `/api/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | ❌ | Patient registration |
| `POST` | `/login` | ❌ | Patient login |
| `GET` | `/get-profile` | ✅ | Get patient profile |
| `POST` | `/update-profile` | ✅ | Update profile + photo |
| `POST` | `/book-appointment` | ✅ | Book a slot |
| `GET` | `/appointments` | ✅ | Patient's appointment list |
| `POST` | `/cancel-appointment` | ✅ | Cancel + request refund |
| `POST` | `/payment-razorpay` | ✅ | Create Razorpay order |
| `POST` | `/verifyRazorpay` | ✅ | Verify payment signature |

---

## Workflows

### Appointment Booking

```
Patient selects speciality
        ↓
Browse available doctors
        ↓
Select doctor → view open time slots
        ↓
Confirm booking → slot reserved in DB
        ↓
Razorpay checkout (order created server-side)
        ↓
Payment success → signature verified server-side
        ↓
Appointment marked as paid in DB
        ↓
Doctor sees appointment in dashboard
        ↓
Doctor marks Complete or Cancelled
```

### Refund Flow

```
Patient cancels appointment
        ↓
Backend initiates Razorpay refund
        ↓
Appointment marked: cancelled + refund.status = 'initiated'
        ↓
Razorpay processes refund asynchronously
        ↓
refund.status updated to 'processed'
```

---

## Known Limitations

These are real issues in the current codebase worth being aware of:

- **Single hardcoded admin** — Admin credentials are stored in `.env`, not in the database. No multi-admin support.
- **No webhook for refund confirmation** — Refund status is set to `initiated` but there is no Razorpay webhook handler to automatically update it to `processed`.
- **Slot conflict not atomic** — Slot availability is checked and updated in separate operations, which could cause double-booking under concurrent requests.
- **No email/SMS notifications** — No confirmation sent to patients or doctors after booking or cancellation.
- **Doctor fees stored as String** — The `fees` field in `doctorModel` is typed as `String`, not `Number`, which can cause sorting/comparison bugs.

---

## Roadmap

- [ ] Razorpay webhook integration for refund status updates
- [ ] Email notifications (booking confirmation, cancellation, reminders)
- [ ] Doctor search by name, fee range, and availability
- [ ] Admin role stored in DB (support multiple admins)
- [ ] Downloadable appointment receipts (PDF)
- [ ] Doctor ratings and patient reviews
- [ ] Atomic slot booking with MongoDB transactions
- [ ] Unit and integration tests (Jest + Supertest)
- [ ] Docker setup for local development

---

## Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes with a clear message

```bash
git commit -m "feat: add email notification on appointment booking"
```

4. Push and open a Pull Request

```bash
git push origin feature/your-feature-name
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## License

Licensed under the [MIT License](LICENSE).

---

<div align="center">

Developed by **Shahid Amzad**

</div>