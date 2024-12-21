import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { Card } from './widgets/card'
import { BsUpload } from 'react-icons/bs'
import Image from 'next/image'

export default function Section() {
    return (
        <div className=' select-none bg-foreground w-full text-background 2xl:w-3/4 mt-5 pt-12 mb-12'>
            <div className='flex justify-between items-center'>
                <span className='text-4xl text-primary cursive'>Best Accomodation Plans<p className='text-xs text-gray-300'>best now best saved . book you home place at easy and enjoy much free life</p></span>
                <div className='bg-gray-100 rounded-xl flex items-center pl-2'>
                    <CiSearch />
                    <input className='text-black p-3 rounded-xl  bg-transparent outline-none focus:ring-0 right-0' placeholder='search for place' />
                    <button className='bg-secondary p-2 text-white h-full rounded-xl'>search</button>
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
            <div className='mt-12 flex-col flex items-center w-full bg-red-100 p-12'>
                <Image alt='no-data' src={'/no_data.jpg'} width={200} height={200} />
                No homes at the moment | Be The first to upload
                <button className='bg-primary text-white p-4 rounded-xl flex gap-x-2 items-center mt-10'><BsUpload /> Upload </button>
            </div>
        </div>
    )
}
