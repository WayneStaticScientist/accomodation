import React, { FC, useState } from 'react'
import { SharedProps } from './niceinput'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'

export const LogInput: FC<SharedProps> = ({ className, hint, Icon, Obscure, Summary, change, InputStyle }) => {
    const [show, setVisible] = useState(false)
    return (
        <div className={`${className} bg-[#ffffff20] m-1 rounded-xl items-center flex pl-2 w-5/6 select-none  pr-2 text-white`}>
            {Icon}
            <input value={Summary} onChange={(e) =>
                change && change(e.target.value)} type=
                {`${Obscure && !show ? 'password' : 'text'}`}
                placeholder={hint} className={`outline-none ring-0 focus:ring-0 bg-transparent p-3 w-full ${InputStyle}`} />
            {Obscure && (<button onClick={() => setVisible(!show)}>{show ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}</button>)}
        </div>
    )
}
