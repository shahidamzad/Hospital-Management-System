import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments,cancelAppointment,completeAppointment } = useContext(DoctorContext)
  const { calculateAge, slotFormatDate, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 font-medium text-lg text-gray-700'>All Appointments</p>

      <div className='bg-white border border-gray-100 rounded-lg text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll shadow-sm'>

        {/* Header */}
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-4 px-6 border-b border-gray-100 bg-gray-50 rounded-t-lg'>
          <p className='text-gray-400 font-medium'>#</p>
          <p className='text-gray-400 font-medium'>Patient</p>
          <p className='text-gray-400 font-medium'>Payment</p>
          <p className='text-gray-400 font-medium'>Age</p>
          <p className='text-gray-400 font-medium'>Date & Time</p>
          <p className='text-gray-400 font-medium'>Fees</p>
          <p className='text-gray-400 font-medium'>Action</p>
        </div>

        {/* Rows */}
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors'
          >
            <p className='text-gray-400 max-sm:hidden '>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover bg-gray-100' src={item.userData.image} alt="" />
              <p className='text-gray-600'>{item.userData.name}</p>
            </div>

            <p>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.payment ? 'bg-green-50 text-green-500' :  ' bg-yellow-50 text-yellow-500'}`}>
                {item.payment ? 'Online' : 'Cash'}
              </span>
            </p>

            <p className='max-sm:hidden' >{calculateAge(item.userData.dob)}</p>

            <p>{slotFormatDate(item.slotDate)}, {item.slotTime}</p>

            <p className='text-gray-600 font-medium'>{currency}{item.amount}</p>

            <div className='flex items-center gap-2'>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                  : <>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-10 cursor-pointer opacity-90 hover:opacity-100 transition-opacity'
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className='w-10 cursor-pointer opacity-90 hover:opacity-100 transition-opacity'
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </>
              }
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default DoctorAppointments