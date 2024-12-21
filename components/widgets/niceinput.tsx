import React, { FC, JSX } from 'react'
export interface SharedProps {
    hint?: string
    className?: string
    checked?: boolean
    change?: (e: string) => void
    Icon?: JSX.Element
    Summary?: string
    Obscure?: boolean
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