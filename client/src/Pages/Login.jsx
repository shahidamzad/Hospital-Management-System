// import React, { useState, useContext, useEffect } from 'react'
// import { AppContext } from '../Context/appContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'

// const Login = () => {
//   const { token, setToken, backendUrl } = useContext(AppContext)
//   const navigate = useNavigate()

//   const [state, setState] = useState('Sign Up')
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   // Redirect immediately if already logged in — don't wait for token state change
//   useEffect(() => {
//     if (token) {
//       navigate('/')
//     }
//   }, [token, navigate])

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()

//     try {
//       const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
//       const payload = state === 'Sign Up' ? { name, email, password } : { email, password }

//       const { data } = await axios.post(backendUrl + endpoint, payload)

//       if (data.success) {
//         localStorage.setItem('token', data.token)
//         setToken(data.token)
//         // Navigate immediately here — don't rely solely on the useEffect
//         navigate('/')
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const handleToggle = () => {
//     setState(prev => prev === 'Sign Up' ? 'Login' : 'Sign Up')
//     // Clear fields when switching modes
//     setName('')
//     setEmail('')
//     setPassword('')
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
//       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-500 text-sm shadow-lg hover:border-blue-400'>
//         <p className='font-semibold text-2xl'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
//         <p>Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to Book Appointment</p>

//         {state === 'Sign Up' && (
//           <div className='w-full'>
//             <p>Full Name</p>
//             <input
//               className='border border-zinc-500 rounded w-full p-2 mt-1'
//               type="text"
//               placeholder='Full Name'
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//             />
//           </div>
//         )}

//         <div className='w-full'>
//           <p>Email</p>
//           <input
//             className='border border-zinc-500 rounded w-full p-2 mt-1'
//             type="email"
//             placeholder='Email'
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           />
//         </div>

//         <div className='w-full'>
//           <p>Password</p>
//           <input
//             className='border border-zinc-500 rounded w-full p-2 mt-1'
//             type="password"
//             placeholder='Password'
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//           />
//         </div>

//         <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>
//           {state === 'Sign Up' ? 'Create Account' : 'Login'}
//         </button>

//         {state === 'Sign Up'
//           ? <p>Already have an account? <span onClick={handleToggle} className='text-primary underline cursor-pointer'>Login here</span></p>
//           : <p>New here? <span onClick={handleToggle} className='text-primary underline cursor-pointer'>Create an account</span></p>
//         }
//       </div>
//     </form>
//   )
// }

// export default Login

import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { token, setToken, backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Redirect immediately if already logged in — don't wait for token state change
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password }

      const { data } = await axios.post(backendUrl + endpoint, payload)

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        // Navigate immediately here — don't rely solely on the useEffect
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleToggle = () => {
    setState(prev => prev === 'Sign Up' ? 'Login' : 'Sign Up')
    // Clear fields when switching modes
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-500 text-sm shadow-lg hover:border-blue-400'>
        <p className='font-semibold text-2xl'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to Book Appointment</p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              className='border border-zinc-500 rounded w-full p-2 mt-1'
              type="text"
              placeholder='Full Name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-500 rounded w-full p-2 mt-1'
            type="email"
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-500 rounded w-full p-2 mt-1'
            type="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={handleToggle} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>New here? <span onClick={handleToggle} className='text-primary underline cursor-pointer'>Create an account</span></p>
        }
      </div>
    </form>
  )
}

export default Login