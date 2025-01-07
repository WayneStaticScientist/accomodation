import React, { FC, useRef, useState } from 'react'
import { SharedProps } from './niceinput'
import { Divider } from 'primereact/divider'
import { SlOptions } from 'react-icons/sl'
import { MdAttachMoney } from 'react-icons/md'
import Image from 'next/image'
import { Menu } from 'primereact/menu'
import { GrView } from 'react-icons/gr'

export const Card: FC<SharedProps> = ({ checked, hint, className }) => {
    return (
        <div className={`flex-shrink-0 pt-1 pb-1 ${className} ${checked ? 'bg-primary text-white' : 'ring-1 ring-primary'} pr-5 pl-5 w-min rounded-full flex-shrink-0 h-min`}>{hint}</div>
    )
}
export const MosaicCard: FC<SharedProps> = ({ className, hint, Icon, Summary }) => {
    return (
        <div className={`${className} select-none
         w-72 min-h-96 cursor-pointer  bg-[#ffffff10] rounded-xl mt-10 text-white flex-col p-8 hover:bg-[#32ce9a10] overflow-clip text-ellipsis`}>
            {Icon}
            <Divider className='h-1' />
            <div className='text-2xl font-bold'> {hint}</div>
            <Divider className='h-1' />
            <div className='text-clip overflow-clip flex-col flex'>{Summary}</div>
        </div>
    )
}
export const TipperCard: FC<SharedProps> = ({ hint, onClick, amount, Summary, imagePath, menuItems, count }) => {
    const menuRef = useRef<Menu>(null);
    return (<div className='max-h-96 overflow-hidden cursor-pointer hover:scale-110 bg-cards shadow-lg p-5 rounded-md overflow-x-clip' onClick={onClick}>
        <div className='flex justify-between items-center mb-5'>
            <div className='flex items-center'>
                <SubImage path={imagePath} />
                <span className='flex flex-col justify-start h-full pl-3 '>
                    <span>{hint}</span>
                    <span className='flex items-center gap-x-5'>
                        <span className='flex items-center flex-shrink-0 text-green-500'><MdAttachMoney />{amount}</span>
                        <span className='flex items-center gap-x-1 flex-shrink-0 text-orange-500'><GrView />{count} </span></span>
                </span>
            </div>
            <div>
                <Menu model={menuItems} popup ref={menuRef} id="popup_menu_left" />
                <div onClick={(e) => menuRef.current?.toggle(e)}>
                    <SlOptions />
                </div>
            </div>
        </div>
        <div className=' text-xs'>
            {Summary}
        </div>
    </div>)
}
interface SubImageProps {
    path?: string;
}

export const SubImage: FC<SubImageProps> = ({ path }) => {
    const [hasError, setHasError] = useState(false);

    if (!path || path == '') return <span className='w-24 rounded-xl h-24 bg-blue-600'></span>
    return (<>
        {hasError ? (<><span className='w-24 rounded-xl h-24 bg-blue-600'></span></>) : (<>
            <Image className='w-28 h-28 rounded-xl' src={`${process.env.NEXT_PUBLIC_STATIC_SERVER}${path.replaceAll("\\", '/')}`} alt='load' width={1024} height={1024} onError={() => {
                setHasError(true)
            }} /></>)}
    </>)
}