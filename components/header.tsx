import React from 'react'
import Image from 'next/image'
import { FaCartArrowDown, FaPlay, FaRegUser, FaSearch } from 'react-icons/fa'
import { RiBloggerLine, RiMenu3Fill } from 'react-icons/ri'
import { MdOutlineSell } from 'react-icons/md'
import { FaRegMoneyBill1 } from 'react-icons/fa6'
import Link from 'next/link'
import { isRegistered } from '@/utils/user_check'
import useUser from '@/stores/userstore'
import { Profile } from './toolbar'


export default function Header() {
    const { user, icoins } = useUser()
    return (
        <div className=' z-20 h-full flex flex-col items-center w-full   pb-48  2xl:w-3/4'>
            <div className='w-full  pb-12   '>
                <div className='flex w-full  xl:pt-12 xl:pl-12 xl:pr-12 items-center justify-between'>
                    <Image alt="ads" className='w-36 h-12' width={1206} height={416} src="/archpay.png" />
                    <div className='flex items-center text-white gap-x-6'>
                        <Link href={"/user/dashboard"}><button className='flex gap-x-2 items-center mr-6'><FaCartArrowDown /> Cart</button></Link>
                        {
                            !isRegistered(user) ?
                                (<> <Link href="/user/login"><button className='flex gap-x-2 flex-shrink-0'><FaRegUser />Sign In</button></Link>
                                    <Link href="/user/register">
                                        <button className='flex gap-x-2 pl-6 pr-6 flex-shrink-0 bg-primary text-white p-2 rounded-2xl '>Sign Up</button>
                                    </Link></>)
                                : (<Profile name={user.name} profile={user.profile} amount={icoins} />)
                        }
                    </div>
                </div>
                <div className='flex w-full text-xs mt-3  xl:pl-12 xl:pr-12 items-center justify-between text-white'>
                    <div className='flex items-center gap-x-6'>
                        <button className='flex gap-x-2 items-center'><RiMenu3Fill /> All categories</button>
                        <button>Featured selections</button>
                        <button>ArchAccount</button>
                    </div>
                    <div className='flex items-center gap-x-6 mt-5'>
                        <button className='flex gap-x-2 items-center'><RiBloggerLine /> Create blog</button>
                        <button className='flex gap-x-2 items-center'><MdOutlineSell />Sell Items</button>
                        <button className='flex gap-x-2 items-center'><FaRegMoneyBill1 />Earn Online</button>
                    </div>
                </div>
            </div>
            <div className='flex w-full text-white h-full flex-col  xl:pt-12 xl:pl-12 xl:pr-12 '>
                <div className='grid grid-cols-2'>
                    <div className='flex-col  gap-y-4'>
                        <span className='flex gap-x-3 text-gray-400 items-center text-lg'><FaPlay className='text-xs mr-3' />Archipay.com Games</span>
                        <div className='text-3xl font-bold'>The Best Online Selling and money making Platform website for Zimbabwe
                        </div>
                        <div className='flex bg-white  mt-12 rounded-full gap-x-3'>
                            <input placeholder='search what you want' className='w-full bg-transparent p-5 outline-none focus:outline-none text-black' />
                            <button className='flex p-3 items-center rounded-full m-2 bg-primary h-full pl-6 pr-6 '><FaSearch /> search</button>
                        </div>
                    </div>
                    <div className='flex-col items-center w-full justify-center'>
                    </div>
                </div>
            </div>
        </div >
    )
}
