import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {

  const { dToken, getDashData, dashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotFormatDate, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5'>

      {/* Stats Cards */}
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency}{dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Appointments */}
      <div className='bg-white mt-10 rounded border border-gray-100 shadow-sm'>

        <div className='flex items-center gap-2.5 px-4 py-4 border-b border-gray-100'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Appointments</p>
        </div>

        <div>
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-50 border-b border-gray-100'>

              <img className='rounded-full w-10 h-10 object-cover' src={item.userData.image} alt="" />

              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-500'>Booking on {slotFormatDate(item.slotDate)}</p>
              </div>

              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                  : <p className='text-blue-400 text-xs font-medium'>Pending</p>
              }

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default DoctorDashboard