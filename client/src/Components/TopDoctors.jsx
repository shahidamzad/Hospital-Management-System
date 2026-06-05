import React, { useContext } from 'react'
// import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/appContext.jsx';

const TopDoctors = () => {

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
      <h1 className=' text-3xl font-medium '>To Doctors to Book</h1>
      <p className='w-1/3 text-center text-sm  '>Simple browse through our extensive list of trusted Doctors. </p>

      <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] lg:grid-cols-5 gap-4 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className=' border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500  ' key={index} >
            <img className='bg-blue-50' src={item.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500 '>
                <span className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span>
                <p className={item.available ? 'text-green-500' : 'text-red-500'}>
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-blue-400 text-white px-12 py-3 font-bold rounded-full mt-10  hover:bg-blue-500 hover:scale-115 transition-all  '>More</button>
    </div>
  )
}

export default TopDoctors