import React from 'react'
import { assets } from '../assets/assets'
import Footer from '../Components/Footer'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl text-gray-500 pt-10'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 capitalize '>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm  text-gray-600 '>
          <p>Welcome To Prescripto,Your Trusted Patner in Managing Your Healthcare Needs Conveniently , And Effeiciently. At Prescripto , We Understand The Challanges Individuals Face Whwn It Comes To Scheduling Dpctor Appointments And Manageing Their Heath Records </p>
          <p>Prescripto Is Commitled To Excellence In Healths Technology . We Continuously Strive To Enhance Our PlatForm , Integrating The Last Advantage To Improve User Experience And Deliver Superior Services. Wheather You're Booking You Frind Appointment Or Manageing Ongoing Care,Prescrito is Here To support you Every Steps of the ways  </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our Vision at prescrito is to create a seamless Healthcare Experience for every User . we aim ri bridge the gap between patients And Heathcare Providers , Making it easier for you to acess the care you need , when you need it.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold  '> CHOOSE US</span> </p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 capitalize'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-500 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined Appointment Scheduling That Fits Inti Yiur Busy Lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-500 cursor-pointer'>
          <b>CONVENINECE:</b>
          {/* Changed <P> to <p> below */}
          <p>Access To network of trusted Healthcare Professionals in Your Area.</p>4</div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-500 cursor-pointer'>
          <b>PERSONALIZATION :</b>
          {/* Changed <P> to <p> below */}
          <p>Tailored recommendations and reminders to helps you stay on your health </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About