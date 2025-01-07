import { MdSpaceDashboard } from 'react-icons/md';
import { SharedProps } from '../niceinput';
import { FC } from 'react';
import { Divider } from 'primereact/divider';
import { FaAngleDown, FaCommentAlt, FaNewspaper, FaShoppingCart, FaUserGraduate } from 'react-icons/fa';
import { BsDatabaseFillDash } from 'react-icons/bs';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { GiShadowFollower } from 'react-icons/gi';
import { FaCircleInfo } from 'react-icons/fa6';
import useUser from '@/stores/userstore';
import Link from 'next/link';


const SideDrawer: FC<SharedProps> = ({ className, page, setPage }) => {
    const { user } = useUser();

    return (
        <div className={`${className} col-span-1 bg-navbar h-full rounded-xl drop-shadow-lg text-white p-3 flex flex-col pl-5 select-none`}>
            <div className='mt-3 flex gap-x-5 items-center font-bold'><BsDatabaseFillDash size={30} /> ArshPay</div>
            <Divider className='h-px ring-1 ring-[#ffffff10] w-full' />
            <div className='flex gap-x-3 items-center w-full justify-between hover:bg-[#ffffff20] p-3 cursor-pointer'>
                <div className='flex gap-x-3'>
                    <div className='w-5 h-5 bg-green-500 rounded-full flex-shrink-0' />
                    {user.name}
                </div>
                <FaAngleDown />
            </div>
            <Divider className='h-px ring-1 ring-[#ffffff10] w-full' />
            <Link href="/user/blog">
                <button className='w-full mt-5 mb-5 bg-green-400 p-5 font-bold rounded-xl hover:bg-green-300 active:bg-green-700 active:scale-90 flex items-center justify-center gap-x-2'>
                    CREATE BLOG</button>
            </Link>
            <div className={`flex items-center gap-x-3 p-3 ${page == 0 ? 'bg-[#ffffff20]' : 'hover:bg-[#ffffff10] cursor-pointer'}`} onClick={() => page != 0 && setPage!(0)}>
                <MdSpaceDashboard /> Dashboard
            </div>
            <div className='mt-6 font-bold'>Pages</div>
            <div className='p-3 select-none'>
                <div className={`flex gap-x-6 items-center p-3 ${page == 1 ? 'bg-[#ffffff20]' : 'hover:bg-[#ffffff10] cursor-pointer'}`} onClick={() => page != 1 && setPage!(1)}><PiUploadSimpleBold /> Uploads</div>
                <div className={`flex gap-x-6 items-center p-3 ${page == 2 ? 'bg-[#ffffff20]' : 'hover:bg-[#ffffff10] cursor-pointer'}`} onClick={() => page != 2 && setPage!(2)}><FaCommentAlt /> Comments</div>
                <div className={`flex gap-x-6 items-center p-3 ${page == 3 ? 'bg-[#ffffff20]' : 'hover:bg-[#ffffff10] cursor-pointer'}`} onClick={() => page != 3 && setPage!(3)}><GiShadowFollower /> Followers</div>
                <div className={`flex gap-x-6 items-center p-3 ${page == 4 ? 'bg-[#ffffff20]' : 'hover:bg-[#ffffff10] cursor-pointer'}`} onClick={() => page != 4 && setPage!(4)}><FaShoppingCart /> Catelogue</div>
            </div>
            <Divider className='h-px ring-1 ring-[#ffffff10] w-full' />
            <div className='font-bold'>Docs</div>
            <div className='p-3 select-none'>
                <div className={`flex gap-x-6 items-center p-3 ${page == 5 ? 'bg-[#ffffff20]' : 'hover:bg-[#ffffff10] cursor-pointer'}`} onClick={() => page != 5 && setPage!(5)}><FaUserGraduate /> Tutorials</div>
                <div className={`flex gap-x-6 items-center p-3 ${page == 6 ? 'bg-[#ffffff20]' : 'hover:bg-[#ffffff10] cursor-pointer'}`} onClick={() => page != 6 && setPage!(6)}><FaCircleInfo /> ArshPay</div>
                <div className={`flex gap-x-6 items-center p-3 ${page == 7 ? 'bg-[#ffffff20]' : 'hover:bg-[#ffffff10] cursor-pointer'}`} onClick={() => page != 7 && setPage!(7)}><FaNewspaper /> News And Updates</div>
            </div>
        </div >
    );
};

export default SideDrawer;