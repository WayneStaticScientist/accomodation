import { LogInput } from '@/components/widgets/loginput'
import React, { useRef, useState } from 'react'
import { MdEmail, MdLock, MdPerson, MdPhone } from 'react-icons/md'
import { Stepper, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Link from 'next/link';
import { MultiSelect } from 'primereact/multiselect';
import { InputMask } from 'primereact/inputmask';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { registerUser } from '@/pages/utils/utils';
export default function App() {
    const toast = useRef<Toast>(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [phone, setPhone] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const stepperRef = useRef<StepperRefAttributes>(null)
    const [selectedRoles, setSelectedRoles] = useState([]);
    const roleOptions = [
        { name: 'Agent' },
        { name: 'Landlord' },
        { name: 'Student' },
        { name: 'Lodger' },
        { name: 'Buyer' },
        { name: 'Seller' }
    ];
    const register = async () => {
        if (loading) return
        setLoading(true)
        setErrorMessage("")
        const response = registerUser({ name, email, password: pass1, role: selectedRoles, phone, idNumber })
        if (typeof response == 'string') {
            setErrorMessage(response)
            toast.current?.show({ severity: 'error', summary: 'Error', detail: response, life: 3000 });
        } else {
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'User Registered Successfully', life: 3000 });
        }
        setLoading(false)
    }
    return (
        <div className='flex bg-hero bg-cover justify-center items-center w-screen h-screen bg-primary flex-col'>
            <Toast ref={toast} />
            <div className='w-full h-full backdrop-blur-sm flex items-center justify-center flex-col bg-[#000000aa]'>
                <div className='text-2xl font-bold mb-12'>ACCOUNT | REGISTER</div>
                <div className='grid grid-cols-5 flex-row bg-white text-black w-1/2 rounded-2xl'>
                    <div className='bg-hero bg-cover col-span-2 rounded-l-2xl text-black'>
                        <div className='rounded-l-2xl w-full h-full backdrop-blur-md flex flex-col items-center justify-center'>
                            <div className='cursive text-4xl font-bold'>accommodation</div>
                            <div>live life the good way </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mt-10  col-span-3 overflow-x-scroll'>
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
                                <MultiSelect display='chip' value={selectedRoles}
                                    onChange={(e) => setSelectedRoles(e.value)} options={roleOptions} optionLabel="name"
                                    placeholder="your role" maxSelectedLabels={3} className="w-full md:w-20rem bg-gray-100" />
                                <label htmlFor="serial" className="font-bold block mb-2">ID Number</label>
                                <InputMask onChange={(e) => setIdNumber(e.value!)} className='bg-gray-100 p-3 w-full' id="serial" mask="99-9999999a999" placeholder="99-999a999" value={idNumber}></InputMask>
                                {errorMessage.length > 0 && <div className={`flex bg-red-300 mt-5 text w-full p-3 justify-center items-center`}>
                                    {errorMessage}
                                </div>}
                                <button className='mt-5 p-3 bg-primary text-white rounded-xl w-full' onClick={register}>
                                    {loading ? (<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                                    ) : (<>login</>)}</button>
                            </StepperPanel>
                        </Stepper>
                        <div className='mt-3 mb-5 text-xs text-gray-500'>Already Have Account <Link href='/user/login' className='text-primary'>Login </Link></div>
                    </div>
                </div>
                <div className='mt-12'>{new Date().getFullYear()} Openchains | All Rights Reserved</div>
            </div>
        </div >
    )
}