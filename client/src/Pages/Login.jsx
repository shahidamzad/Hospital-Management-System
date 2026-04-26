import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <form className='min-h-[80vh] flex items-center '>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-500 text-sm shadow-lg hover:border-blue-400 '>
        <p className='font-semibold text-2xl'>{state === "Sign Up" ? "Create Account" : "Login "}</p>
        <p>Please {state === 'Sign Up' ? 'Sign Up ' : 'Login'} to Book Appointment </p>
        {state === "Sign Up" && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-500 rounded w-full p-2 mt-1' type="text" placeholder='Full Name' onChange={(e) => setName(e.target.value)} value={name} required />
        </div>}
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-500 rounded w-full p-2 mt-1' type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-500 rounded w-full p-2 mt-1' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'} </button>
        {state === "Sign Up" ? <p>Already have an Account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p> : <p>Create a New Account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span> </p>}
      </div>
    </form>
  )
}

export default Login