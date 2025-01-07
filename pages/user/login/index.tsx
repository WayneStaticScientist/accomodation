import { LogInput } from '@/components/widgets/loginput'
import { getDeviceId, loginUser, setMLink, setXLink } from '@/pages/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Toast } from 'primereact/toast'
import React, { useRef, useState } from 'react'
import { MdEmail, MdLock } from 'react-icons/md'

export default function App() {
    const toast = useRef<Toast>(null)
    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const login = async () => {
        if (loading) return
        setLoading(true)
        setErrorMessage("")
        const response: object | string = await loginUser({
            device: getDeviceId(), email, password: pass1,
            id: '',
            role: [],
            name: '',
            surname: '',
            phone: '',
            address: '',
            city: '',
            id_number: '',
            documents: '',
            profile: '',
            country: ''
        })
        if (typeof response === 'string') {
            setErrorMessage(response)
            toast.current?.show({ severity: 'error', summary: 'Error', detail: response, life: 3000 });
        } else {
            const token = response as { message: string, token: object }
            const { access_token, refresh_token } = token.token as { access_token: string, refresh_token: string };
            setXLink(access_token)
            setMLink(refresh_token)
            setLoading(false)
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'User Registered Successfully', life: 3000 });
            router.back()
        }
        setLoading(false)
    }
    return (
        <div className='flex bg-hero bg-cover justify-center items-center w-screen h-screen bg-primary flex-col'>
            <Toast ref={toast} />
            <div className='w-full h-full backdrop-blur-3xl flex items-center justify-center flex-col bg-[#000000aa]'>
                <div className=' flex-row bg-[#ffffff10] text-black w-1/5 rounded-2xl'>
                    <div className='flex flex-col items-center mt-10'>
                        <div>
                            <Image className='w-20 h-20' alt='logo' src={"/archpay_single.png"} width={380} height={416} />
                        </div>
                        <span className='text-primary text-4xl font-bold text-white'>ArshPay</span>
                        <span className='text-gray-500 text-xs'>Login with email</span>
                        <LogInput Summary={email} className='mt-5' hint='enter email' Icon={<MdEmail />} change={setEmail} />
                        <LogInput Summary={pass1} className='mt-5' Obscure={true} hint='enter password' Icon={<MdLock />} change={setPass1} />
                        {errorMessage.length > 0 && <div className={`flex bg-red-300 mt-5 text p-3 justify-center items-center`}>
                            {errorMessage}
                        </div>}
                        <button className='mt-5 p-3 bg-[#ffffff30] text-white rounded-xl pl-16 pr-16 h-10 flex text-center items-center' onClick={login}>
                            {loading ? (<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                            ) : (<>login</>)}</button>  <div className='mt-3 mb-5 text-xs text-gray-500'>Dont have account <Link href='/user/register' className='text-white'>Create Account</Link></div>
                    </div>
                </div>
                <div className='mt-12 text-white'>{new Date().getFullYear()} Openchains | All Rights Reserved</div>
            </div>
        </div>
    )
}
