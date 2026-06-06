// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets.js'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../Context/appContext.jsx';

// const Navbar = () => {

//     const navigate = useNavigate();

//     const { token, setToken, userData } = useContext(AppContext)

//     const [showMenu, setShowMenu] = useState(false);

//     const logout = () => {
//         setToken(false)
//         localStorage.removeItem('token')
//     }


//     return (
//         <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300'>
//             <img onClick={() => navigate('/')} className='w-44 cursor-pointer ' src={assets.logo} alt="" />
//             <ul className='hidden md:flex items-start gap-5 font-medium '>
//                 <NavLink to='/'>
//                     <li className='py-1' >HOME</li>
//                     <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to='/doctors' >
//                     <li className='py-1'>ALL DOCTORS</li>
//                     <hr className='border-none outline-none h-0.5  bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to='/about'>
//                     <li className='py-1'>ABOUT</li>
//                     <hr className='border-none outline-none  h-0.5 bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//                 <NavLink to='/contact'>
//                     <li className='py-1'>CONTACT</li>
//                     <hr className='border-none outline-none h-0.5  bg-primary w-3/5 m-auto hidden' />
//                 </NavLink>
//             </ul>


//             <div className='flex items-center gap-3 '>
//             {
//                 token && userData ?
//                 <div className='flex items-center gap-2 cursor-pointer group relative'>
//                     <img className='w-8 rounded-full object-cover' src={userData.image} alt="profile-img" />
//                     <img className='w-2.5' src={assets.dropdown_icon} alt="" />
//                     <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block  '>
//                         <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4'>
//                             <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                             <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
//                             <p onClick={logout} className='hover:text-black cursor-pointer '>Logout</p>
//                         </div>
//                     </div>
//                 </div>
//                  : <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-blue-600'>Create Account</button>
//             }
//             </div>

//             <div className='flex items-center gap-3'>
//                 {
//                     token && userData && (

//                         <div className='flex items-center gap-2 cursor-pointer group relative'>

//                             <div className='w-9 h-9 rounded-full overflow-hidden'>
//                                 <img
//                                     className='w-full h-full object-cover' src={userData?.image || assets.profile_pic} alt="profile-img"/>
//                             </div>

//                             <img className='w-2.5' src={assets.dropdown_icon}  alt="" />

//                             <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>

//                                 <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4'>

//                                     <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'> My Profile </p>

//                                     <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'> My Appointments</p>

//                                     <p onClick={logout} className='hover:text-black cursor-pointer'> Logout </p>

//                                 </div>

//                             </div>

//                         </div>

//                     )
//                 }
//             </div>


//             <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />


//             {/*-------moblie menu ---------*/}
//             <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
//                 <div className='flex items-center justify-between py-6 px-5'>
//                     <img className='w-36' src={assets.logo} alt="" />
//                     <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
//                 </div>
//                 <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
//                     <NavLink onClick={() => setShowMenu(false)} to='/' > <p>Home</p> </NavLink>
//                     <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p>ALL DOCTORS</p></NavLink>
//                     <NavLink onClick={() => setShowMenu(false)} to='/about' > <p>ABOUT</p></NavLink>
//                     <NavLink onClick={() => setShowMenu(false)} to='/contact' > <p>CONTACT</p></NavLink>
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default Navbar

import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext.jsx'

const Navbar = () => {
    const navigate = useNavigate()
    const { token, setToken, userData } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300'>

            {/* Logo */}
            <img
                onClick={() => navigate('/')}
                className='w-44 cursor-pointer'
                src={assets.logo}
                alt="logo"
            />

            {/* Desktop Nav Links */}
            <ul className='hidden md:flex items-center gap-5 font-medium'>
                <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
                <NavLink to='/doctors'><li className='py-1'>ALL DOCTORS</li></NavLink>
                <NavLink to='/about'><li className='py-1'>ABOUT</li></NavLink>
                <NavLink to='/contact'><li className='py-1'>CONTACT</li></NavLink>
            </ul>

            {/* Desktop Right Section */}
            <div className='hidden md:flex items-center gap-3'>
                {token && userData ? (
                    // Profile Dropdown — rendered ONCE
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <div className='w-9 h-9 rounded-full overflow-hidden'>
                            <img
                                className='w-full h-full object-cover'
                                src={userData.image || assets.profile_pic}
                                alt="profile"
                            />
                        </div>
                        <img className='w-2.5' src={assets.dropdown_icon} alt="" />

                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4'>
                                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className='bg-primary text-white px-8 py-3 rounded-full font-light hover:bg-blue-600'
                    >
                        Create Account
                    </button>
                )}
            </div>

            {/* Mobile Hamburger */}
            <img
                onClick={() => setShowMenu(true)}
                className='w-6 md:hidden cursor-pointer'
                src={assets.menu_icon}
                alt="menu"
            />

            {/* Mobile Menu */}
            <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between py-6 px-5'>
                    <img className='w-36' src={assets.logo} alt="logo" />
                    <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" />
                </div>

                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink onClick={() => setShowMenu(false)} to='/'><p>HOME</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p>ALL DOCTORS</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/about'><p>ABOUT</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/contact'><p>CONTACT</p></NavLink>
                </ul>

                {/* Mobile Login/Profile — was completely missing before */}
                <div className='mt-6 flex flex-col items-center'>
                    {token && userData ? (
                        <div className='flex flex-col items-center gap-3 text-base font-medium text-gray-600'>
                            <p onClick={() => { navigate('/my-profile'); setShowMenu(false) }} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={() => { navigate('/my-appointments'); setShowMenu(false) }} className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p onClick={() => { logout(); setShowMenu(false) }} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    ) : (
                        <button
                            onClick={() => { navigate('/login'); setShowMenu(false) }}
                            className='bg-primary text-white px-8 py-3 rounded-full font-light hover:bg-blue-600'
                        >
                            Create Account
                        </button>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Navbar