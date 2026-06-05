import React, { useState } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: JSON.stringify(profileData.address),
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='m-5'>
      <div className='flex flex-col gap-6 items-start'>

        <img
          className='max-w-64 rounded-lg object-cover bg-primary/20'
          src={profileData.image}
          alt=""
        />

        <div className='w-full bg-white border border-gray-100 rounded-lg p-8 shadow-sm'>

          <p className='text-3xl font-semibold text-gray-800'>{profileData.name}</p>

          <div className='flex items-center gap-2 mt-2'>
            <p className='text-gray-500 text-sm'>{profileData.degree} - {profileData.speciality}</p>
            <span className='text-xs border border-gray-300 text-gray-500 px-2 py-0.5 rounded-full'>{profileData.experience}</span>
          </div>

          <div className='mt-5'>
            <p className='text-sm font-semibold text-gray-700'>About:</p>
            <p className='text-sm text-gray-500 mt-1 leading-relaxed'>{profileData.about}</p>
          </div>

          <div className='mt-4 flex items-center gap-2 text-sm'>
            <p className='text-gray-700 font-semibold'>Appointment fee:</p>
            {isEdit
              ? <input
                  className='border border-gray-300 rounded px-2 py-0.5 w-24 text-sm'
                  type="number"
                  value={profileData.fees}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                />
              : <span className='text-gray-600'>{currency} {profileData.fees}</span>
            }
          </div>

          <div className='mt-4 flex items-start gap-2 text-sm'>
            <p className='text-gray-700 font-semibold min-w-16'>Address:</p>
            {isEdit
              ? <div className='flex flex-col gap-1 flex-1'>
                  <input
                    className='border border-gray-300 rounded px-2 py-0.5 w-full'
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  />
                  <input
                    className='border border-gray-300 rounded px-2 py-0.5 w-full'
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                  />
                </div>
              : <div className='text-gray-500'>
                  <p>{profileData.address.line1}</p>
                  <p>{profileData.address.line2}</p>
                </div>
            }
          </div>

          <div className='flex items-center gap-2 mt-4'>
            <input
              id='available'
              type="checkbox"
              checked={profileData.available}
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
            />
            <label className='text-sm text-gray-600 cursor-pointer' htmlFor="available">Available</label>
          </div>

          <div className='mt-6'>
            {isEdit
              ? <button
                  onClick={updateProfile}
                  className='px-6 py-2 bg-primary text-white text-sm rounded-full hover:opacity-90 transition-all'
                >
                  Save
                </button>
              : <button
                  onClick={() => setIsEdit(true)}
                  className='px-6 py-2 border border-primary text-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all'
                >
                  Edit
                </button>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile