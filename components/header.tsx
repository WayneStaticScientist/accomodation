import React from 'react'
import Toolbar from './toolbar'
import { Panel } from './panel'

export default function Header() {
    return (
        <div className=' flex flex-col items-center w-screen p-3 bg-[#00000099] backdrop-blur-sm'>
            <Toolbar />
            <div className='grid grid-cols-3 w-full 2xl:w-3/4'>
                <Panel className=" col-span-1" />
                <div className=" col-span-2 w-full flex flex-col items-center justify-center" >
                    <div className='text-2xl'>Find <span className='text-primary font-extrabold'>Accomodation</span> Easy</div>
                    <div className='text-center p-4 m-4'>Find affordable homes ! Meeting your requirements,
                        effortless, & at the comfort of your couch which relates to your budget
                        distance ruleset and many more without fear of spams,this platform provides you all the tools!</div>
                    <button className='p-2 bg-primary text-white rounded-xl' >Register | Login</button>
                </div>
            </div>
        </div>
    )
}
