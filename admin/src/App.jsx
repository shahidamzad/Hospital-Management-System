import React, { useContext } from 'react'
import Login from './pages/Login'
 import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar.jsx'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllAppointment from './pages/Admin/AllAppointment.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorList from './pages/Admin/DoctorList.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';

const App = () => {

  const {aToken } = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)


  return aToken || dToken ? (
    <div className='bg-[#f9f9fd]'>
      <ToastContainer />
      <Navbar />
      <div className=' flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointment' element={<AllAppointment />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorList />} />

          {/* Doctors Routes */}

          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />


        </Routes>
      </div>
    </div>
  ) : (
    <>
    
     <Login />
      <ToastContainer />
    </>
  )
}

export default App