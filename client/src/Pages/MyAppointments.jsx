import React, { useContext } from 'react'
import { AppContext } from '../Context/appContext.jsx'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([]);
  const [showRefundPopup, setShowRefundPopup] = useState(false)
  const [pendingCancelId, setPendingCancelId] = useState(null)
  const navigate = useNavigate()

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotFormatDate = (dateStr) => {
    const dateArray = dateStr.split('-')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getAddress = (address) => {
    if (!address) return { line1: '', line2: '' };
    if (typeof address === 'string') {
      const trimmed = address.trim();
      if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        const jsonLike = trimmed
          .replace(/(['"])?([a-zA-Z0-9_]+)\1\s*:/g, '"$2":')
          .replace(/'/g, '"');
        try {
          const parsed = JSON.parse(jsonLike);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch (e) {
          console.warn('Failed to parse address JSON:', e, address);
        }
      }
      return { line1: address, line2: '' };
    }
    return address;
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const handleCancelClick = (appointmentId, isPaid) => {
    if (isPaid) {
      setPendingCancelId(appointmentId)
      setShowRefundPopup(true)
    } else {
      cancelAppointment(appointmentId)
    }
  }

  const confirmCancel = () => {
    setShowRefundPopup(false)
    cancelAppointment(pendingCancelId)
    setPendingCancelId(null)
  }

  const dismissPopup = () => {
    setShowRefundPopup(false)
    setPendingCancelId(null)
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "appointment payment",
      description: "appointment payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razopay', { appointmentId }, { headers: { token } });
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>

      {showRefundPopup && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl'>
            <h2 className='text-lg font-semibold text-gray-800 mb-2'>Cancel Appointment?</h2>
            <p className='text-sm text-gray-600 mb-1'>Your refund will be credited within <span className='font-medium text-indigo-600'>3 business days</span>.</p>
            <p className='text-xs text-gray-400 mb-5'>Cancellation charges may apply based on time remaining.</p>
            <div className='flex gap-3'>
              <button onClick={confirmCancel} className='flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all'>
                Yes, Cancel
              </button>
              <button onClick={dismissPopup} className='flex-1 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all'>
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='max-h-[70vh] overflow-y-auto'>
        {appointments.map((item, index) => {
          const address = getAddress(item.docData.address);

          // Single source of truth for status
          const isCompleted = item.isCompleted
          const isCancelled = item.cancelled
          const isPending = !isCompleted && !isCancelled

          return (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>

              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
              </div>

              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{address?.line1 || ''}</p>
                <p className='text-xs'>{address?.line2 || ''}</p>
                <p className='text-sm mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotFormatDate(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className='flex flex-col gap-2 justify-end items-center'>

                {/* Completed */}
                {isCompleted && (
                  <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-600'>
                    Appointment Completed
                  </button>
                )}

                {/* Cancelled */}
                {isCancelled && (
                  <div className='text-sm text-center sm:min-w-48'>
                    <button className='w-full items-center py-2 border border-red-500 rounded text-red-600'>
                      Appointment Cancelled
                    </button>
                    {item.refund && (
                      <p className='text-xs text-green-600 mt-1'>
                        Refund of ₹{item.refund.amount} initiated • 3 business days
                      </p>
                    )}
                  </div>
                )}

                {/* Pending - Paid */}
                {isPending && item.payment && (
                  <button className='sm:min-w-48 py-2 border rounded text-stone-50 bg-indigo-400'>
                    Paid
                  </button>
                )}

                {/* Pending - Pay Online */}
                {isPending && !item.payment && (
                  <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-black transition-all duration-300'>
                    Pay Online
                  </button>
                )}

                {/* Pending - Cancel */}
                {isPending && (
                  <div className='relative group sm:min-w-48'>
                    <button
                      onClick={() => handleCancelClick(item._id, item.payment)}
                      className='w-full text-sm text-stone-500 text-center py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'
                    >
                      Cancel Appointment
                    </button>

                    {item.payment && (
                      <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-800 text-white text-xs rounded-lg p-3 hidden group-hover:block z-10 shadow-lg'>
                        <p className='font-medium mb-1'>Refund Policy</p>
                        <p>✅ 4+ hrs before → <span className='text-green-400'>90% refund</span></p>
                        <p>⚠️ Within 4 hrs → <span className='text-yellow-400'>50% refund</span></p>
                        <p className='mt-1 text-gray-400 text-[10px]'>Credited in 3 business days</p>
                        <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800'></div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyAppointments