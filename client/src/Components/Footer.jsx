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
                    <p className='w-full md:w-1/2 text-gray-600 leading-6  '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit nemo laudantium pariatur dolores facere obcaecati deleniti nostrum et dicta corporis sint inventore voluptas impedit dolorum, totam officiis harum minima aliquid, id aspernatur.</p>
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
                        <li>phone no.</li>
                        <li>gamil@.com</li>
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