import React, { FC, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { SharedProps } from './widgets/niceinput'
import Image from 'next/image'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { FaCartArrowDown, FaChevronDown, FaRegUser, FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import { isRegistered } from '@/utils/user_check'
import useUser from '@/stores/userstore'
import { SplitButton } from 'primereact/splitbutton'
import { MdOutlineFileUpload } from 'react-icons/md'
import { TbLayoutDashboard } from 'react-icons/tb'
import { RiLogoutCircleRLine, RiUploadCloud2Fill } from 'react-icons/ri'
import { BiCoin } from 'react-icons/bi'

export const Toolbar: FC<SharedProps> = ({ className, ref }) => {
    const filters = ["all", "homes", "rentals", "products"]
    const [filter, setFilter] = useState([])
    const { user, icoins } = useUser()
    return (
        <div ref={ref} className={`${className} z-40 flex drop-shadow-lg p-5 gap-x-5 2xl:pr-12 2xl:pl-12 xl:pr-8 xl:pr:8 w-full bg-cards  items-center justify-between`}>
            <Image alt="ads" className='w-36 h-12' width={1206} height={416} src="/archpay.png" />
            <div className="flex w-full bg-gray-100 rounded-xl">
                <Dropdown value={filter} onChange={(e) => setFilter(e.value)} options={filters} optionLabel="filter"
                    placeholder="all" className="w-fit rounded-l-xl md:w-14rem bg-transparent ring-0 focus:ring-0" />
                <InputText className='w-full bg-transparent  ring-0 focus:ring-0' placeholder="search on archipay " />
                <button className='pl-2 pr-2 bg-foreground text-white rounded-r-xl flex gap-x-2 items-center'><FaSearch />search</button>
            </div>
            <div className='flex items-center gap-x-5'>
                <button className='flex gap-x-2 items-center mr-6'><FaCartArrowDown /> Cart</button>
                {
                    !isRegistered(user) ? (<>
                        <Link href={'/user/login'} className='flex flex-shrink-0'>
                            <button className='flex gap-x-2 flex-shrink-0'><FaRegUser />Sign In</button>
                        </Link>
                        <Link href={'/user/register'} className='flex flex-shrink-0'>
                            <button className='flex gap-x-2 pl-6 pr-6 flex-shrink-0 bg-primary text-white p-2 rounded-2xl '>Sign Up</button>
                        </Link></>) :
                        (<>
                            <Link href={"/catalogs/upload"}>
                                <button className='hover:bg-[#ffffff20] active:bg-primary p-3 flex gap-x-3 items-center rounded-xl '>
                                    <RiUploadCloud2Fill />upload
                                </button>
                            </Link>
                            <Profile name={user.name} profile={user.profile} amount={icoins} /></>)
                }
            </div>
        </div >
    )
}

export interface Prof {
    name: string
    profile: string
    hideSensitivy?: boolean
    amount: number
}
export const Profile: FC<Prof> = ({ name, profile, amount, hideSensitivy }) => {
    return (
        <div className='flex items-center gap-x-2'>
            <SplitButton label={name}
                dropdownIcon={hideSensitivy ? <></> : <FaChevronDown />}
                icon={<>{getProfile(profile)}</>}
                onClick={() => { }} model={hideSensitivy ? [] : [
                    {
                        label: "Upload",
                        icon: <MdOutlineFileUpload />,
                        url: '/catalogs/upload'
                    },
                    {
                        label: "Dashboard",
                        icon: <TbLayoutDashboard />,
                        url: '/user/dashboard'
                    },
                    {
                        label: "Logout",
                        icon: <RiLogoutCircleRLine />,
                    }
                ]} />
            {hideSensitivy ? (<></>) : (<>
                <div className='flex items-center gap-x-2 text-green-600 p-2 bg-[#12fa2020]'><BiCoin />{amount.toFixed(3)}</div>
            </>)}
        </div>
        // <div className='relative select-none cursor-pointer flex gap-y-2 items-center gap-x-2'>
        //     <div className='w-25 h-25'>{getProfile(name, profile)}</div>{name}
        // </div>
    )
}
function getProfile(profile: string) {
    if (profile.length <= 0) {
        return (<div className={`w-10 mr-3 h-10 p-3 rounded-full flex flex-shrink-0 bg-foreground`}><FaUserLarge className='text-theme' /></div>)
    }
    return (<>Hie</>)
}
