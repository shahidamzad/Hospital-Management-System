import React from 'react'
import { IoLogoGithub } from "react-icons/io";
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid md:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* -----left Section   */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-1/2 text-gray-600 leading-6  '> A comprehensive hospital management system designed to streamline
                        patient care, appointments, and administrative workflows —
                        all in one secure platform.</p>
                </div>

                {/* -----center  Section   */}
                <div>
                    <p className='text-xl font-medium mb-5'>CAMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* -----right  Section   */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+1 (415) 555-0123</li>
                        <li>support@prescripto.com</li>
                        <li>GopalGanj, Bihar , India</li>
                    </ul>

                </div>
            </div>
            {/* -------copy right texts  */}
            <div>
                <hr />
                <p className="py-5 text-sm text-center flex items-center justify-center gap-2">
                    copyright © {new Date().getFullYear()} All rights reserved |
                    <a
                        href="https://github.com/shahidamzad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-gray-400"
                    >
                        <IoLogoGithub />
                        shahidamzad
                    </a>
                </p>

            </div>
        </div>
    )
}

export default Footer