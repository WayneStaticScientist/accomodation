import { LogInput } from '@/components/widgets/loginput'
import React, { useRef, useState } from 'react'
import { MdEmail, MdLock, MdPerson, MdPhone } from 'react-icons/md'
import Link from 'next/link';
import { MultiSelect } from 'primereact/multiselect';
import { InputMask } from 'primereact/inputmask';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getDeviceId, registerUser, setMLink, setXLink } from '@/pages/utils/utils';
import router from 'next/router';
import Image from 'next/image';
import { Divider } from 'primereact/divider';
export default function App() {
    const toast = useRef<Toast>(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [phone, setPhone] = useState("")
    const [surname, setSurname] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
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
        const response: object | string = await registerUser({
            device: getDeviceId(), name, email, password: pass1,
            role: selectedRoles.map((e: { name: string }) => e.name), phone,
            id_number: idNumber,
            id: '',
            surname,
            address: '',
            city: '',
            documents: '',
            profile: '',
            country: ''
        })
        console.log(response)
        if (typeof response == 'string') {
            setErrorMessage(response)
            toast.current?.show({ severity: 'error', summary: 'Error', detail: response, life: 3000 });
        } else {
            const token = response as { message: string, token: object }
            const { access_token, refresh_token } = token.token as { access_token: string, refresh_token: string };
            setXLink(access_token)
            setMLink(refresh_token)
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'User Registered Successfully', life: 3000 });
            router.back()
        }

    }

    return (
        <div>
            <style jsx global>{`
            ::-webkit-scrollbar{width: 8px;}
::-webkit-scrollbar-track {
    background-color: transparent; 
}
::-webkit-scrollbar-thumb {
    background-color: #ffffff20; 
}
::-moz-scrollbar {
    width: 8px;
}
::-moz-scrollbar-track {
    background-color: transparent; 
}
::-moz-scrollbar-thumb {
    background-color: #ffffff20; 
}
::-ms-scrollbar {
    width: 8px;
}
::-ms-scrollbar-track {
    background-color: transparent; 
}
::-ms-scrollbar-thumb {
    background-color: #ffffff20; 
}   `}</style>
            <div className='flex overflow-hidden bg-hero bg-cover justify-center items-center w-screen h-screen bg-primary flex-col'>
                <Toast ref={toast} />
                <div className='w-full h-full backdrop-blur-2xl flex items-center justify-center flex-col bg-[#000000aa]'>
                    <div className=' flex-row bg-[#ffffff10] text-black w-1/3 h-3/4 overflow-y-auto'>
                        <div className='flex flex-col items-center mt-10 w-full p-10'>
                            <div>
                                <Image className='w-20 h-20' alt='logo' src={"/archpay_single.png"} width={380} height={416} />
                            </div>
                            <span className='text-white text-4xl font-bold'>Welcome</span>
                            <span className='text-gray-500 text-xs mb-8'>register with all your details</span>
                            <div className='flex pb-5 flex-col ring-1 ring-[#ffffff80] bg-[#ffffff30] w-full rounded-2xl justify-center items-center'>
                                <div className='text-white w-full flex justify-start p-3'>Personal Details</div>
                                <LogInput Summary={name} className='mt-5' hint='enter name' Icon={<MdPerson />} change={setName} />
                                <LogInput Summary={surname} className='mt-5' hint='enter surname' Icon={<MdPerson />} change={setSurname} />
                                <LogInput Summary={phone} className='mt-5' hint='enter phone' Icon={<MdPhone />} change={setPhone} />
                                <LogInput Summary={email} className='mt-5' hint='enter email' Icon={<MdEmail />} change={setEmail} />
                            </div>
                            <Divider className='bg-[#ffffff10] h-1 mt-12 mb-12' />

                            <div className='flex pb-5 flex-col ring-1 ring-[#ffffff80] bg-[#ffffff30] w-full rounded-2xl justify-center items-center'>
                                <div className='text-white w-full flex justify-start p-3'>Other IU</div>
                                <LogInput Summary={pass1} className='mt-5' Obscure={true} hint='enter password' Icon={<MdLock />} change={setPass1} />
                                <LogInput Summary={pass2} className='mt-5' Obscure={true} hint='renter password' Icon={<MdLock />} change={setPass2} />
                            </div>
                            <Divider className='bg-[#ffffff10] h-1 mt-12 mb-12' />
                            <div className='flex p-3 pb-5 flex-col ring-1 ring-[#ffffff80] bg-[#ffffff30] w-full rounded-2xl justify-center items-center'>
                                <div className='text-white w-full flex justify-start p-3'>Other Info</div>
                                <MultiSelect display='chip' value={selectedRoles}
                                    onChange={(e) => setSelectedRoles(e.value)} options={roleOptions} optionLabel="name"
                                    placeholder="your role" maxSelectedLabels={3} className="w-full md:w-20rem bg-[#ffffff20]" />
                                <label htmlFor="serial" className="font-bold  text-xs text-white mb-2 w-full flex justify-start mt-2">ID Number</label>
                                <InputMask onChange={(e) => setIdNumber(e.value!)} className=' focus:right-0 ring-0 bg-[#ffffff20] text-white p-3 w-full' id="serial" mask="99-9999999a999" placeholder="99-999a999" value={idNumber}></InputMask>
                                {errorMessage.length > 0 && <div className={`flex bg-red-300 mt-5 text w-full p-3 justify-center items-center`}>
                                    {errorMessage}
                                </div>}
                            </div>
                            <button className='mt-5 p-3 bg-[#ffffff40]  text-white rounded-xl w-full' onClick={register}>
                                {loading ? (<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                                ) : (<>CREATE ACCOUNT</>)}</button>

                            <div className='mt-3 mb-5 text-xs text-gray-500'>Already Have Account <Link href='/user/login' className='text-white'>Login </Link></div>
                        </div>
                    </div>
                    <div className='mt-12 text-white'>{new Date().getFullYear()} Openchains | All Rights Reserved</div>
                </div>
            </div> </div >

    )
}