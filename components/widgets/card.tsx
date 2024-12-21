import React, { FC } from 'react'
import { SharedProps } from './niceinput'

export const Card: FC<SharedProps> = ({ checked, hint, className }) => {
    return (
        <div className={`flex-shrink-0 pt-1 pb-1 ${className} ${checked ? 'bg-primary text-white' : 'ring-1 ring-primary'} pr-5 pl-5 w-min rounded-full flex-shrink-0 h-min`}>{hint}</div>
    )
}
