import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { Card } from './widgets/card'
import { BsUpload } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { MeterGroup, MeterGroupValue } from 'primereact/metergroup';
import { Chip } from 'primereact/chip'
import { FaSignalMessenger } from 'react-icons/fa6'
export default function Section() {
    const values: MeterGroupValue[] = [{
        value: 20,
        label: "IsoFocus",
        color: 'green'
    }, {
        value: 30,
        label: "Terminal",
        color: 'orange'
    }, {
        value: 10,
        label: "Editing",
        color: 'red'
    },
    {
        value: 40,
        label: "Accessibility",
        color: 'blue'
    }
    ]; // Example values, replace with actual data
    return (
        <div className='w-full flex flex-col items-center'>
            <div className=' bg-theme w-full flex justify-center'>
                <div className=' w-full  2xl:w-3/4 grid grid-cols-2 mb-20 mt-20'>
                    <div className='text-5xl font-bold '>
                        Indulge and prosper with us in the world of Uprising MarketPlace
                    </div>
                    <div className='p-3'>
                        <MeterGroup values={values} />
                        <div className='mt-8 grid grid-cols-3 justify-center items-center gap-x-6 w-full  '>
                            <Chip label="Amy Elsner" className='bg-red-500 text-white' icon={<FaSignalMessenger className='mr-2' />} />
                            <Chip label="Asiya Javayant" className='bg-green-500 text-white' icon={<FaSignalMessenger className='mr-2' />} />
                            <Chip label="Onyama Limba" className='bg-blue-600 text-white' icon={<FaSignalMessenger className='mr-2' />} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='select-none  w-full  2xl:w-3/4 mt-5 pt-12 mb-12'>
                <div className='flex justify-between items-center'>
                    <span className='text-4xl text-primary cursive'>Best Accomodation Plans<p className='text-xs text-gray-300'>best now best saved . book you home place at easy and enjoy much free life</p></span>
                    <div className='bg-gray-100 rounded-xl flex items-center pl-2'>
                        <CiSearch />
                        <input className='text-black p-3 rounded-xl  bg-transparent outline-none focus:ring-0 w-full' placeholder='search for place' />
                        <button className='bg-secondary p-3 text-white h-full rounded-r-xl'>search</button>
                    </div>
                </div>
                <div className='flex gap-x-5 mt-5 select-none'>
                    <Card hint='all' className='text-md' checked={true} />
                    <Card hint='coldstreem' className='text-md' />
                    <Card hint='katanda' className='text-md' />
                    <Card hint='gunhill' className='text-md' />
                    <Card hint='brundish' className='text-md' />
                    <Card hint='whitecity' className='text-md' />
                    <Card hint='ruvimbo' className='text-md' />
                    <Card hint='mzari' className='text-md' />
                </div>
                <div className='mt-12 flex-col flex items-center w-full  p-12 gap-y-5'>
                    <Image alt='no-data' src={'/no_data.jpg'} width={200} height={200} />
                    No homes at the moment | Be The first to upload
                    <Link href={'/homes/upload'}>
                        <button className='bg-primary text-white p-4 pr-6 pl-6 rounded-xl flex gap-x-2 items-center mt-10'><BsUpload /> Upload </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
