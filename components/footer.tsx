import React, { FC } from 'react'
import { SharedProps } from './widgets/niceinput'
import { FaFacebook, FaYoutube } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { IoCall } from 'react-icons/io5'
export const FooterDark: FC<SharedProps> = ({ className }) => {
    const now = new Date()
    return (
        <div className={`${className}`}>
            <div className='w-full 2xl:w-3/4 flex justify-center items-center'>
                OpenChains | {now.getFullYear()}
            </div>
        </div>
    )
}
export const Footer: FC<SharedProps> = ({ className }) => {
    return (
        <div className={`${className}`}>
            <div className='w-full 2xl:w-3/4 flex justify-between'>
                <div className='flex flex-col mt-12 text-black col-span-1 w-1/4'>
                    <span className='font-extrabold text-xl'>Accomodation</span>
                    <span className='font-extralight text-xs text-gray-600 mt-3'>Test on our simple Accomodation giveaways .Endulge with us on our services and enjoy the best experience</span>
                    <div className='flex justify-evenly mt-12'>
                        <FaYoutube size={20} />
                        <FaFacebook size={20} />
                        <IoLogoWhatsapp size={20} />
                        <IoCall size={20} />
                    </div>
                </div>
                <div className='col-span-3 grid grid-cols-4 text-black items-center gap-x-8'>
                    <div className='flex flex-col '>
                        <span className='font-bold'>Resources</span>
                        <div className='text-gray-500 text-sm'>Download</div>
                        <div className='text-gray-500 text-sm'>Help</div>
                        <div className='text-gray-500 text-sm'>Book Version</div>
                    </div>
                    <div className='flex flex-col '>
                        <span className='font-bold'>Resources</span>
                        <div className='text-gray-500 text-sm'>Download</div>
                        <div className='text-gray-500 text-sm'>Help</div>
                        <div className='text-gray-500 text-sm'>Book Version</div>
                    </div>
                    <div className='flex flex-col '>
                        <span className='font-bold'>Resources</span>
                        <div className='text-gray-500 text-sm'>Download</div>
                        <div className='text-gray-500 text-sm'>Help</div>
                        <div className='text-gray-500 text-sm'>Book Version</div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Resources</span>
                        <div className='text-gray-500 text-sm'>Download</div>
                        <div className='text-gray-500 text-sm'>Help</div>
                        <div className='text-gray-500 text-sm'>Book Version</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
