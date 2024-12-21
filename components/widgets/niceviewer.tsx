import React, { FC } from 'react'
import { SharedProps } from './niceinput'

export const NiceViewer: FC<SharedProps> = ({ className, hint, Icon, Summary }) => {
    return (
        <div className={`${className} flex flex-col justify-center items-center gap-y-4 w-3/4`}>
            <div>{Icon}</div>
            <div className='font-bold'>{hint}</div>
            <div className='flex text-center'>{Summary}</div>
        </div>
    )
}
