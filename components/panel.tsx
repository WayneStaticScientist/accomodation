import React, { FC, useState } from 'react'
import NiceInput, { SharedProps } from './widgets/niceinput'
import ReactSwitch from 'react-switch'

export const Panel: FC<SharedProps> = ({ className }) => {
    const [boys, setBoys] = useState(true)
    const [girls, setGirls] = useState(false)
    const [mixed, setMixed] = useState(true)
    return (
        <div className={`w-fit flex flex-col bg-foreground text-background p-5 rounded-xl ${className} select-none`}>
            <div className='text-2xl'>LOOKING FOR </div>
            <div className='text-primary text-2xl font-semibold'>ACCOMODATION</div>
            <div className='text-xs mt-5 mb-3'>Find with price range</div>
            <div className='flex gap-x-2'>
                <NiceInput hint='min' />
                <NiceInput hint='max' />
            </div>
            <div className='text-xs mt-5 mb-3'>House Type</div>
            <div className='flex  justify-between items-center'>
                <span className='flex gap-x-2 items-center'><ReactSwitch uncheckedIcon={false} checkedIcon={false} onColor='#00ABBD' onChange={(e) => {
                    if (girls) {
                        setGirls(false)
                    }
                    setBoys(e)
                }} checked={boys} /> Boys</span>
                <span className='flex gap-x-2 items-center'><ReactSwitch uncheckedIcon={false} checkedIcon={false} onColor='#00ABBD' onChange={(e) => {
                    if (boys) {
                        setBoys(false)
                    }
                    setGirls(e)
                }} checked={girls} /> Girls</span>
                <span className='flex gap-x-2 items-center'><ReactSwitch uncheckedIcon={false} checkedIcon={false} onColor='#00ABBD' onChange={(e) => { setMixed(e) }} checked={mixed} /> Mixed</span>
            </div>
            <button className='bg-primary mt-5 p-2 text-white rounded-xl'>find house</button>

        </div>
    )
}
