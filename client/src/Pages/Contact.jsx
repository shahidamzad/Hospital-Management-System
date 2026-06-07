import React from 'react'
import { assets } from '../assets/assets'
import { MapPin, Phone, Mail, Briefcase, ArrowRight } from 'lucide-react'

const Contact = () => {
  return (
    <div className='px-4 md:px-10'>

      {/* Heading */}
      <div className='text-center mt-12 mb-12'>
        <p className='text-xs tracking-widest uppercase text-gray-400 mb-2'>
          Reach out to us
        </p>
        <h2 className='text-3xl font-medium text-gray-800'>
          Contact <span className='text-primary'>Us</span>
        </h2>
      </div>

      {/* Body */}
      <div className='flex flex-col md:flex-row gap-14 mb-28 items-center'>

        {/* Image */}
        <img
          className='w-full md:max-w-[420px] rounded-2xl object-cover'
          src={assets.contact_image}
          alt="Prescripto Office"
        />

        {/* Info */}
        <div className='flex flex-col gap-7 flex-1'>

          {/* Office */}
          <div className='flex flex-col gap-2'>
            <p className='text-xs tracking-widest uppercase text-gray-400'>Our office</p>
            <p className='text-base font-medium text-gray-800'>Prescripto HQ</p>
            <p className='flex items-start gap-2 text-sm text-gray-500'>
              <MapPin size={15} className='mt-0.5 shrink-0 text-gray-400' />
              Sadar hospital - Gopalganj, Bihar, India
            </p>
          </div>

          {/* Contact details */}
          <div className='flex flex-col gap-2'>
            <p className='flex items-center gap-2 text-sm text-gray-500'>
              <Phone size={15} className='text-gray-400' />
              +1 (415) 555-0123
            </p>
            <p className='flex items-center gap-2 text-sm text-gray-500'>
              <Mail size={15} className='text-gray-400' />
              support@prescripto.com
            </p>
          </div>

          <hr className='border-gray-100' />

          {/* Careers */}
          <div className='flex flex-col gap-2'>
            <p className='text-xs tracking-widest uppercase text-gray-400'>Careers at Prescripto</p>
            <p className='text-base font-medium text-gray-800'>Join our growing team</p>
            <p className='text-sm text-gray-500 leading-relaxed'>
              We're always looking for talented individuals passionate about improving healthcare.
              Explore open roles across engineering, design, and operations.
            </p>
            <button className='mt-2 flex items-center gap-2 w-fit border border-primary text-primary px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300'>
              <Briefcase size={15} />
              Explore open positions
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact