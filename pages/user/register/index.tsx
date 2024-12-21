import { LogInput } from '@/components/widgets/loginput'
import React, { useRef, useState } from 'react'
import { CgLock } from 'react-icons/cg'
import { MdEmail, MdLock, MdPerson, MdPhone } from 'react-icons/md'
import { Stepper, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Link from 'next/link';
export default function App() {
    const stepperRef = useRef<StepperRefAttributes>(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [phone, setPhone] = useState("")

    return (
        <div className='flex bg-hero bg-cover justify-center items-center w-screen h-screen bg-primary flex-col'>
            <div className='w-full h-full backdrop-blur-sm flex items-center justify-center flex-col bg-[#000000aa]'>
                <div className='text-2xl font-bold mb-12'>ACCOUNT | REGISTER</div>
                <div className='grid grid-cols-5 flex-row bg-white text-black w-1/2 rounded-2xl'>
                    <div className='bg-hero bg-cover col-span-2 rounded-l-2xl text-black'>
                        <div className='rounded-l-2xl w-full h-full backdrop-blur-md flex flex-col items-center justify-center'>
                            <div className='cursive text-4xl font-bold'>accommodation</div>
                            <div>live life the good way </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mt-10  col-span-3'>
                        <span className='text-primary text-4xl font-bold'>Welcome</span>
                        <span className='text-gray-500 text-xs'>register with all your details</span>

                        <Stepper ref={stepperRef} orientation="vertical">
                            <StepperPanel header="Personal Details">
                                <LogInput Summary={name} className='mt-5' hint='enter name' Icon={<MdPerson />} change={setName} />
                                <LogInput Summary={phone} className='mt-5' hint='enter phone' Icon={<MdPhone />} change={setPhone} />
                                <LogInput Summary={email} className='mt-5' hint='enter email' Icon={<MdEmail />} change={setEmail} />
                                <div className='flex items-end w-full  justify-end'>
                                    <Button className='bg-primary text-white text-xs p-3 mt-3' onClick={() => { stepperRef.current!.nextCallback() }} >Next <GrFormNext /></Button>
                                </div>
                            </StepperPanel>
                            <StepperPanel header="Secrect Information">
                                <LogInput Summary={pass1} className='mt-5' Obscure={true} hint='enter password' Icon={<MdLock />} change={setPass1} />
                                <LogInput Summary={pass2} className='mt-5' Obscure={true} hint='renter password' Icon={<MdLock />} change={setPass2} />
                                <div className='flex items-end w-full  justify-between'>
                                    <Button className='bg-primary text-white text-xs p-3 mt-3' onClick={() => { stepperRef.current!.prevCallback() }} >Prev <GrFormPrevious /></Button>
                                    <Button className='bg-primary text-white text-xs p-3 mt-3' onClick={() => { stepperRef.current!.nextCallback() }} >Next <GrFormNext /></Button>
                                </div>
                            </StepperPanel>
                            <StepperPanel header="Last Details">
                                <LogInput className='mt-5' hint='enter email' Icon={<MdEmail />} />
                                <LogInput Obscure={true} className='mt-5' hint='enter password' Icon={<CgLock />} />
                                <button className='mt-5 w-5/6 p-3 bg-primary text-white rounded-xl' onClick={async () => {
                                    try {
                                        const api = await fetch("/api/auth/register");
                                        console.log("sssssssssss")
                                        console.log(await api.json())
                                    } catch (e) {
                                        console.log(e)
                                    }
                                }}>login</button>
                            </StepperPanel>
                        </Stepper>
                        <div className='mt-3 mb-5 text-xs text-gray-500'>Already Have Account <Link href='/user/login' className='text-primary'>Login </Link></div>

                    </div>
                </div>
                <div className='mt-12'>{new Date().getFullYear()} Openchains | All Rights Reserved</div>
            </div>
        </div>
    )
}