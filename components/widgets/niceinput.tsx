import { MenuItem } from 'primereact/menuitem'
import React, { FC, JSX, RefObject } from 'react'
export interface SharedProps {
    hint?: string
    page?: number
    amount?: number
    Summary?: string
    checked?: boolean
    count?: number
    Obscure?: boolean
    InputStyle?: string
    Icon?: JSX.Element
    imagePath?: string
    className?: string
    onClick?: () => void
    change?: (e: string) => void
    setPage?: (page: number) => void
    menuItems?: MenuItem[] | undefined,
    ref?: RefObject<HTMLDivElement | null>
}
export const NiceInput: FC<SharedProps> = ({ hint }) => {
    return (
        <div className='flex flex-col bg-gray-300 p-1'>
            <span className=''>{hint}</span>
            <input type='' placeholder='0.00' className='bg-transparent ring-0 focus:right-0 outline-none' />
        </div>
    )
}
export default NiceInput