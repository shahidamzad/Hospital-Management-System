import React, { useState ,useContext  } from 'react'
import { assets } from '../assets/assets.js'
import axios from 'axios'


import { AdminContext } from '../context/AdminContext.jsx'
import { toast } from 'react-toastify'

const Login = () => {

    const {setAToken, backendUrl} = useContext(AdminContext)

    const [state, setState] = useState("Admin")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmitHandler = async (e)=>{
        e.preventDefault()

        try {
            if (state === 'Admin') {

                const { data } = await axios.post(backendUrl + '/api/admin/login', {email,password});
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token);   
                }else{
                    toast.error(data.message)
                }
                
            }else{
                console.log(data.message);
                
            }
            
        } catch (error) {
            
        }
    }



    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col items-start gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm shadow-lg text-[#5e5e5e] '>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#dadada] rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#dadada] rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button  className='bg-primary text-white w-full py-2 rounded-md text-base ' >Login</button>
                {
                    state === 'Admin' ? <p>Doctor Login? <span className='cursor-pointer underline text-primary' onClick={()=>setState('Doctor')}> Click here</span></p> : <p>Admin Login? <span className='cursor-pointer text-primary underline' onClick={()=>setState('Admin')}> Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login