import React, { FC } from 'react'
import { SharedProps } from './widgets/niceinput'
import Image from 'next/image'

const Services: FC<SharedProps> = ({ className }) => {
    return (
        <div className={`${className} flex flex-col items-center `}>
            <span className='text-4xl  font-extralight'>Our Other Services</span>
            <div className='grid grid-cols-4 mt-12'>
                <div className='col-span-1 text-xs flex flex-col gap-y-2 h-full m-3 hover:scale-105 transition-all font-extrabold'>
                    <Image className='w-full h-full object-cover rounded-xl' alt="ads" width={1650} height={825} src="/avatar_ads.jpg" />
                    We offer electrical repair services and Building of custom electrical components
                </div>
                <div className='col-span-3 grid grid-cols-2'>
                    <div className='col-span-1 text-xs flex flex-col gap-y-2 m-3 hover:scale-105 transition-all font-extrabold'>
                        <Image className='w-full rounded-xl h-56 object-cover' alt="ads" width={1400} height={787} src="/photo_editor.jpg" />
                        We offer electrical repair services and Building of custom electrical components
                    </div>
                    <div className='col-span-1 text-xs flex flex-col gap-y-2 m-3 hover:scale-105 transition-all font-extrabold'>
                        <Image className='w-full rounded-xl h-56 object-cover' alt="ads" width={1920} height={1080} src="/robotics.jpg" />
                        We offer electrical repair services and Building of custom electrical components
                    </div>
                    <div className='col-span-1 text-xs flex flex-col gap-y-2 m-3 hover:scale-105 transition-all font-extrabold'>
                        <Image className=' w-full rounded-xl h-56 object-cover' alt="ads" width={700} height={700} src="/web.avif" />
                        We offer electrical repair services and Building of custom electrical components
                    </div>
                    <div className='col-span-1 text-xs flex flex-col gap-y-2 m-3 hover:scale-105 transition-all font-extrabold'>
                        <Image className='w-full rounded-xl h-56 object-cover' alt="ads" width={1280} height={853} src="/electronics.jpg" />
                        We offer electrical repair services and Building of custom electrical components
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services 