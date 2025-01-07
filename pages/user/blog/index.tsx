import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Splitter, SplitterPanel } from 'primereact/splitter'
import React, { useEffect, useRef, useState } from 'react'
import { FaFileCode, FaUserCircle } from 'react-icons/fa'
import { IoMdHome, IoMdSettings, IoMdNotifications } from 'react-icons/io'
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import { IoCloudUpload } from 'react-icons/io5'
import { Dialog } from 'primereact/dialog'
import Image from 'next/image'
import { LogInput } from '@/components/widgets/loginput'
import { ProgressSpinner } from 'primereact/progressspinner'
import { MdDriveFileRenameOutline, MdOutlineSummarize } from 'react-icons/md'
import { Toast } from 'primereact/toast'
import { getMLink } from '@/pages/utils/utils'
import { title } from 'process'
import { PageResult } from '@/utils/interfaces'
import router from 'next/router'
import { DBUser } from '@/pages/api/userdata/user'
const Blogger = () => {
    const toast = useRef<Toast>(null)
    const [pageTitle, setPageTitle] = useState("")
    const [pageSummary, setPageSummary] = useState("")
    const emailEditorRef = useRef<EditorRef>(null);
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false);
    const [sampleLoaded, setSampleLoaded] = useState(false);
    const [myPages, setMyPages] = useState<PageResult[]>([]);
    const [pageLoading, setPageLoading] = useState(true);
    const onReady: EmailEditorProps['onReady'] = () => {
        // editor is ready
        // you can load your template here;
        // the design json can be obtained by calling
        // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

        // const templateJson = { DESIGN JSON GOES HERE };
        // unlayer.loadDesign(templateJson);
    };
    const getMyPages = async (pageNumber: number) => {
        setPageLoading(true)
        if (!localStorage.getItem("user")) {
            return router.push("/user/login")
        }
        const user: DBUser = JSON.parse(localStorage.getItem("user")!)
        try {
            const api = await fetch(`${process.env.NEXT_PUBLIC_STATIC_SERVER}app/get/page`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        key_name: "owner",
                        key_value: user.email,
                        page: pageNumber,
                    })
                }
            )
            if (api.ok) {
                setSampleLoaded(true)
                const { pages } = await api.json();
                setMyPages(pages)
            } else {

            }
        } catch (e) {
            return e
        }
        setPageLoading(false)
    }
    useEffect(() => {
        if (sampleLoaded) return
        getMyPages(1)
    }, [])
    const uploadPage = () => {
        const unlayer = emailEditorRef.current?.editor;
        setLoading(true)
        unlayer?.exportHtml(async (data) => {
            const { html } = data;
            if (html.replaceAll(" ", "").length <= 0) {
                setLoading(false)
                return toast.current?.show({ severity: 'error', summary: 'Error', detail: 'cant upload empty html file', life: 3000 });
            }
            try {
                const api = await fetch(`${process.env.NEXT_PUBLIC_STATIC_SERVER}app/uploadPage`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            html_body: html,
                            refresh_token: getMLink(),
                            page_title: title,
                            page_summary: pageSummary
                        })
                    }
                )
                if (api.ok) {
                    toast.current?.show({ severity: 'success', summary: 'OK', detail: 'File uploaded ', life: 3000 });
                } else {
                    if (api.status == 400) {
                        const { message } = await api.json();
                        toast.current?.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
                    } else {
                        toast.current?.show({ severity: 'error', summary: 'Error', detail: "unknown error", life: 3000 });
                    }
                }
            } catch (e) {
                toast.current?.show({ severity: 'error', summary: 'Error ' + e, detail: "There was error : " + e, life: 3000 });
            }
            setVisible(false)
            setLoading(false)
        });

    }
    return (
        <>{pageLoading ? (<div></div>) : (<>
            <div className='w-screen h-screen'>

                <Toast ref={toast} />
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                            <div className=' flex-row bg-[#ffffff10] text-black rounded-2xl w-full'>
                                <div className='flex flex-col items-center mt-10'>
                                    <div>
                                        <Image className='w-20 h-20' alt='logo' src={"/archpay_single.png"} width={380} height={416} />
                                    </div>
                                    <span className='text-primary text-4xl font-bold text-white'>ArshPay</span>
                                    <span className='text-white text-xs'>Enter Page Properties</span>
                                    <LogInput Summary={pageTitle} className='mt-5 '
                                        InputStyle='placeholder-gray-200'
                                        hint='Page Title' Icon={<MdOutlineSummarize />} change={setPageTitle} />
                                    <LogInput Summary={pageSummary} className='mt-5 '
                                        InputStyle='placeholder-gray-200'
                                        hint='Page Summary' Icon={<MdDriveFileRenameOutline />} change={setPageSummary} />
                                    <button className='mt-5 mb-5 p-3 bg-[#ffffff30] text-white rounded-xl pl-16 pr-16 h-10 flex text-center items-center'
                                        onClick={uploadPage}>
                                        {loading ? <><ProgressSpinner /></> : <> upload page</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                ></Dialog>
                <div className='w-full justify-between p-3 items-center flex bg-cards '>
                    < div className="flex gap-x-1 items-center text-gray-500 ">
                        <IoMdHome /> / Catelogs /
                        <span className="text-foreground">New Page</span>
                    </div>
                    <div className="flex gap-x-5 items-center ">
                        <FloatLabel>
                            <InputText className="rounded-none p-1 bg-background ring-1 ring-gray-400"
                                id="search" value={""} onChange={() => { }} />
                            <label htmlFor="search">search here</label>
                        </FloatLabel>
                        <FaUserCircle size={23} />
                        <IoMdSettings size={23} />
                        <IoMdNotifications size={23} />
                    </div>
                </div>
                <div className='flex w-full items-center'>
                    <button className=' items-center p-3 bg-primary text-white m-3 rounded-lg flex gap-x-2' onClick={() => setVisible(true)}>
                        <IoCloudUpload />upload</button></div>
                <div className='w-full h-full'>
                    <Splitter style={{ height: '100%' }}>
                        <SplitterPanel className="flex w-full h-full align-items-center justify-content-center">

                            {myPages.length > 0 ? (<>
                                <div className='flex flex-col p-3'>
                                    <div className=''>My Files</div>
                                    <div>
                                        {
                                            myPages.map((e, i) => {
                                                return (<div key={i} className=' cursor-pointer select-none
                                        hover:bg-gray-100 p-3 grid grid-cols-5 items-center justify-between'>
                                                    <div
                                                        onClick={() => {
                                                            router.push(`$${process.env.NEXT_PUBLIC_STATIC_SERVE}${e.page_path}`)
                                                        }}
                                                        className=' col-span-4 flex items-center gap-x-3 flex-shrink-0'>
                                                        <FaFileCode size={25} className='flex-shrink-0' />
                                                        <div className='flex flex-col'>
                                                            <span className='text-xs font-bold text-black'>{e.page_title}</span>
                                                            <span className='text-xs h-5 flex flex-grow-0 overflow-clip'>{e.page_summary}</span>
                                                        </div>
                                                    </div>
                                                    <div className='col-span-1 flex gap-4 w-full flex-col text-xs'>
                                                        <button className='bg-slate-100 p-1 rounded-lg hover:bg-slate-300'>edit</button>
                                                    </div>
                                                </div>)
                                            })
                                        }
                                    </div>
                                </div></>) : (<>
                                    <div className='flex w-full h-full justify-center items-center'>
                                        No Pages | Uploaded by You
                                    </div>
                                </>)}
                        </SplitterPanel>
                        <SplitterPanel className="flex align-items-center justify-content-center w-full">
                            <EmailEditor ref={emailEditorRef} onReady={onReady} />
                        </SplitterPanel>
                    </Splitter>
                </div>
            </div></>)
        }</>
    )
}
export default Blogger