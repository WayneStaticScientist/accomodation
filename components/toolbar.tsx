import React from 'react'

export default function Toolbar() {
    return (
        <div className='text-sm pl-12 pr-12 pt-1 pb-1 select-none bg-foreground  m-3 items-center rounded-2xl text-background flex-row flex justify-between w-full 2xl:w-3/4'>
            <div className=''>ACCOMODATION</div>
            <div className='flex gap-x-3 '>
                <div>Homes</div>
                <div>Boarding Houses</div>
                <div>Single</div>
                <div>Sharing</div>
            </div>
            <div className='flex items-center gap-x-2'>
                <div>Register</div>
                <a href='/user/login'> <button className='text-white bg-primary p-2 rounded-lg'>Login</button></a>
            </div>
        </div>
    )
}
