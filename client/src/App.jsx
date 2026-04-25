import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Doctors from './Pages/Doctors.jsx'
import Login from './Pages/Login.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import MyProfile from './Pages/MyProfile.jsx'
import MyAppointments from './Pages/MyAppointments.jsx'
import Appointment from './Pages/Appointment.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'

const App = () => {
  return (
    <div className='mx-4 sm:mx[10%] '>
      <Navbar />
      <Routes>

        <Route path='/' element= {<Home />} />
        <Route  path='/doctors' element={<Doctors />} />
        <Route  path='/doctors/:speciality' element={<Doctors />} />
        <Route  path='/login ' element={<Login />} />
        <Route  path='/about' element={<About />} />
        <Route  path='/contact' element={<Contact />} />
        <Route  path='/my-profile' element={<MyProfile />} />
        <Route  path='/my-appointments' element={<MyAppointments />} />
        <Route  path='/appointment/:docId' element={<Appointment />} />

        
      </Routes>
      <Footer />
      
    </div>
  )
}

export default App