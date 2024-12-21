import { LogInput } from '@/components/widgets/loginput'
import Link from 'next/link'
import React from 'react'
import { CgLock } from 'react-icons/cg'
import { MdEmail } from 'react-icons/md'

export default function App() {
    return (
        <div className='flex bg-hero bg-cover justify-center items-center w-screen h-screen bg-primary flex-col'>
            <div className='w-full h-full backdrop-blur-sm flex items-center justify-center flex-col bg-[#000000aa]'>
                <div className='text-2xl font-bold mb-12'>ACCOUNT | LOGIN</div>
                <div className='grid grid-cols-5 flex-row bg-white text-black w-1/2 rounded-2xl'>
                    <div className='bg-hero bg-cover col-span-2 rounded-l-2xl text-black'>
                        <div className='rounded-l-2xl w-full h-full backdrop-blur-md flex flex-col items-center justify-center'>
                            <div className='cursive text-4xl font-bold'>accomodation</div>
                            <div>live life the good way </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mt-10  col-span-3'>
                        <span className='text-primary text-4xl font-bold'>Welcome</span>
                        <span className='text-gray-500 text-xs'>Login with email</span>
                        <LogInput className='mt-5' hint='enter email' Icon={<MdEmail />} />
                        <LogInput Obscure={true} className='mt-5' hint='enter password' Icon={<CgLock />} />
                        <button className='mt-5 w-5/6 p-3 bg-primary text-white rounded-xl'>login</button>
                        <div className='mt-3 mb-5 text-xs text-gray-500'>Dont have account <Link href='/user/register' className='text-primary'>Create Account</Link></div>
                    </div>
                </div>
                <div className='mt-12'>{new Date().getFullYear()} Openchains | All Rights Reserved</div>
            </div>
        </div>
    )
}
