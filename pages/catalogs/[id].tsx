import { Chip } from 'primereact/chip';
import { useRouter } from 'next/router';
import { HiHome } from 'react-icons/hi';
import { BsEye, } from 'react-icons/bs';
import { BiError } from 'react-icons/bi';
import { MdDelete, MdEdit, MdHideImage, MdReport } from 'react-icons/md';
import { getProduct } from '../utils/utils';
import { Divider } from 'primereact/divider';
import { Galleria } from 'primereact/galleria';
import { MenuItem } from 'primereact/menuitem';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { BreadCrumb } from 'primereact/breadcrumb';
import { ProductResult } from '../api/userdata/product';
import { RiEdit2Fill, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { FaThumbsUp, FaUserCircle } from 'react-icons/fa';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { IoMdHome, IoMdSettings, IoMdNotifications } from 'react-icons/io';
import { Image } from 'primereact/image';
import AnotherImage from "next/image"
import { IoClose } from 'react-icons/io5';
import { Profile } from '@/components/toolbar';
import { GiShadowFollower } from 'react-icons/gi';
import { TfiEmail } from 'react-icons/tfi';
import VertexParser from '@/components/widgets/votex_openchains';
import useUser from '@/stores/userstore';
import { InputTextarea } from 'primereact/inputtextarea';
import { useProduct } from '@/stores/products';

const ItemView: React.FC = () => {
    const parser = new VertexParser()
    const scrollRef = useRef<HTMLDivElement>(null)
    const user = useUser();
    const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
    const handleScroll = (elTopOffset: number, elHeight: number) => {
        if (scrollRef.current!.scrollTop > (elTopOffset + elHeight)) {
            setSticky({ isSticky: true, offset: elHeight });
        } else {
            setSticky({ isSticky: false, offset: 0 });
        }
    };
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState(true)
    const [imagePath, setImagePath] = useState("")
    const headerRef = useRef<HTMLDivElement>(null);
    const [hasError, setHasError] = useState(false)
    const [bottomPanel, setBottomPanel] = useState(0)
    const product = useProduct()
    const [editableDescription, setEditableDescription] = useState(false)
    const [largeImageShow, setShowLargeImage] = useState(false)
    const [descriptionNodes, setDescriptionNodes] = useState<ReactNode>([])
    const [descriptionText, setDescriptionText] = useState<string>("")
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    const Tabs: React.FC<{ product: ProductResult, page: number }> = ({ product }) => {
        switch (bottomPanel) {
            case 0:
                return (<> <div className='font-bold mt-5 flex items-center mb-8'>Product Details {
                    user.email === product.user.email ?
                        <span className='hover:bg-gray-500 flex p-3 gap-x-2 cursor-pointer bg-cards rounded-lg m-2'
                            onClick={() => {
                                if (editableDescription) {
                                    useProduct.setState({ description: descriptionText })
                                    parser.parse(descriptionText).then((e) => {
                                        setDescriptionNodes(e)
                                        return setEditableDescription(false)
                                    })

                                }
                                setEditableDescription(true)
                            }}>
                            <RiEdit2Fill />Edit</span> : null
                } </div>
                    <div>
                        {!editableDescription ? descriptionNodes :
                            <>
                                <InputTextarea value={descriptionText}
                                    className="bg-background text-foreground focus:ring-0 p-3 mb-6 w-full"
                                    onChange={(e) => setDescriptionText(e.target.value)}
                                    rows={10} />
                            </>}</div></>)
            case 1: return (<div className='flex flex-col mt-5 gap-y-5'>
                <div className='flex justify-between items-center'>
                    <Profile hideSensitivy={true} name={product.user.user.name} profile={product.user.user.profile} amount={0} />
                    <span className='flex items-center'> <GiShadowFollower /> {product.user.followers_count} follows</span>
                </div>
                <span className='flex gap-x-2 items-center'><TfiEmail /> {product.user.email}</span>
            </div>)
        }
        return <div className=' flex w-full p-20 justify-center items-center'>No Extra Fees</div>
    }
    const itemTemplate = (item: string) => {
        return <AnotherImage
            className='w-full h-96 hover:scale-105 cursor-pointer '
            width={1024}
            height={1024}
            onClick={() => {
                setShowLargeImage(true);
                setImagePath(`${process.env.NEXT_PUBLIC_STATIC_SERVER}${item.replaceAll("\\", '/')}`)
            }}
            src={`${process.env.NEXT_PUBLIC_STATIC_SERVER}${item.replaceAll("\\", '/')}`}
            alt={"product"} />;
    };
    const thumbnailTemplate = (item: string) => {
        return <Image
            className='w-20 h-24'
            width='80px'
            height='100px'
            src={`${process.env.NEXT_PUBLIC_STATIC_SERVER}${item.replaceAll("\\", '/')}`}
            alt={"product"} />;
    };

    const home: MenuItem = {
        template: < HiHome />, url: '/'
    };
    useEffect(() => {
        const handleScrollEvent = () => {
            handleScroll(0, 100)
        }
        if (localStorage.getItem("user")) {
            useUser.setState(JSON.parse(localStorage.getItem("user")!))
        }
        if (scrollRef.current)
            scrollRef.current!.addEventListener('scroll', handleScrollEvent);
        setHasError(false)
        getProduct(router.query.id as string).then((e) => {
            setLoading(false)
            if (typeof e == 'string') {
                setHasError(true)
                setError(e)
                return console.log(e)
            }
            setDescriptionText(e.product.description)
            parser.parse(e.product.description).then((e) => {
                setDescriptionNodes(e)
            })
            useProduct.setState(e.product)
        })
    }, [])
    const items: MenuItem[] = [{ label: 'Home', url: '/' },
    { label: 'item', url: '/catelogs/' + id }];
    if (hasError) {
        return (
            <div className='flex flex-col items-center justify-center w-screen h-screen gap-y-8'>
                <BiError size={55} />
                <span>{error}</span>
            </div>)
    }
    if (largeImageShow) {
        return (<div className='w-screen h-screen p-12 flex items-center flex-col'>
            <div className='flex items-center gap-y-5 justify-end w-full'>
                <div className='p-3 cursor-pointer hover:bg-[#ffffff0=10] bg-cards text-4xl' onClick={() => setShowLargeImage(false)}>
                    <IoClose />
                </div>
            </div>
            <div className='flex items-center justify-center w-full h-full'>
                <AnotherImage src={imagePath} width={1024} height={1024} alt={''} />
            </div>
        </div>)
    }
    return (
        <div>
            {loading || !product ?
                <div className='w-screen h-screen flex flex-col items-center justify-center'>loading...</div>
                :
                <div className='overflow-x-hidden'>
                    <div className='flex w-screen h-screen flex-col items-center p-3' ref={scrollRef}>

                        <div className={`${sticky.isSticky ? 'fixed z-20 top-5 w-full transition-all 1s forwards bg-cards gap-x-20' : 'w-full justify-between'}
                                   p-3 items-center flex bg-cards `} ref={headerRef}>
                            <div className="flex gap-x-1 items-center text-gray-500 ">
                                <IoMdHome /> / Catelogs /
                                <span className="text-foreground">{product.title}</span>
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
                        <div className='flex flex-col select-none bg-cards shadow-md mt-12'>
                            <div className='flex bg-primary p-4 text-white  items-center justify-between'>
                                <span>Your Product</span>
                                <div className=' flex gap-x-3'>
                                    <button className='p-2 hover:scale-95 text-foreground bg-cards hover:bg-background rounded-lg text-xl'><MdEdit /></button>
                                    <button className='p-2 hover:scale-95 text-foreground bg-cards hover:bg-background rounded-lg text-xl'> <MdHideImage /></button>
                                    <button className='p-2 hover:scale-95 text-foreground bg-cards hover:bg-background rounded-lg text-xl'><MdDelete /></button>
                                </div>
                            </div>
                            <div className='select-none   p-8 w-full  pt-12 '>
                                <BreadCrumb className="bg-background 2xl:pr-12 2xl:pl-12 xl:pr-8 xl:pr:8" model={items} home={home} />
                                <div className='flex flex-col w-full overflow-x-hidden'>
                                    <div className='relative w-full flex justify-center mt-8 overflow-x-clip'>
                                        {product && product.images.length > 0 ?
                                            (<><AnotherImage
                                                className=' absolute top-0 left-0 right-0 bottom-0 w-full h-full blur-xl'
                                                alt=''
                                                width={1024}
                                                height={1024}
                                                src={`${process.env.NEXT_PUBLIC_STATIC_SERVER}` + product.images[0].replaceAll("\\", '/')} /></>)
                                            : (<>hey</>)}
                                        <Galleria className='w-50 h-50 z-10'
                                            value={product.images} responsiveOptions={responsiveOptions}
                                            numVisible={5} style={{ maxWidth: '640px' }}
                                            item={itemTemplate} thumbnail={thumbnailTemplate}
                                        />
                                    </div>
                                    <div className='mt-12'>
                                        <div className='mb-12'>
                                            <div className='text-4xl'>{product.title}</div>
                                            <div className='text-xs '>{product.summary}</div>
                                        </div>
                                        <div className='flex justify-end items-center gap-x-5'>
                                            <span className='flex gap-x-2 items-center '> <FaThumbsUp />{product.likes} likes</span>
                                            <span className='flex gap-x-2 items-center '><BsEye /> {product.views} views</span>
                                        </div>
                                        <div className='mt-6  grid grid-cols-2 items-center '>
                                            <div className='flex flex-col' >
                                                <div className='text-4xl '>
                                                    ${product.price}
                                                    <span className='ml-3 text-xs text-primary'>
                                                        per {product.installements}
                                                    </span>
                                                </div>
                                                <div className='text-xs '>
                                                    distrubuted by {product.user.user.name} {product.user.user.surname}
                                                </div>
                                                <div>
                                                    {product.user.likes_count} user likes and {product.user.followers_count} followers
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-end items-end   w-full '>
                                                <button className='bg-primary text-white p-1 w-52 rounded-md pl-4 pr-4 pt-5 pb-5'>BUY</button>
                                                <button className='bg-background w-52 rounded-md text-xs font-extralight pt-5 pb-5 p-3 mt-6'>ADD TO WISHLIST</button>
                                            </div>
                                        </div>
                                        <Divider />
                                        <div className='mb-2'>Payment Options</div>
                                        <div className='flex gap-x-2'>{product.payments_options.map((e, i) => {
                                            return <Chip label={e.name} icon={<RiMoneyDollarCircleLine />} key={i} />

                                        })}</div>
                                    </div>
                                </div>
                                <Divider className='bg-gray-400' />

                                <div className='flex flex-col mt-12 bg-background p-3'>
                                    <div className='flex justify-between bg-cards'>
                                        <div className='flex'>
                                            <button
                                                onClick={() => setBottomPanel(0)}
                                                className={`p-3 ${bottomPanel == 0 ? 'bg-background border-b-2 border-primary' : 'bg-cards cursor-pointer hover:bg-[#ffffff20]'}`}>Description</button>
                                            <button
                                                onClick={() => setBottomPanel(1)}
                                                className={` p-3 ${bottomPanel == 1 ? 'bg-background border-b-2 border-primary' : 'bg-cards cursor-pointer hover:bg-[#ffffff20]'}`}>Uploader</button>
                                            <button
                                                onClick={() => setBottomPanel(2)}
                                                className={`p-3 ${bottomPanel == 2 ? 'bg-background border-b-2 border-primary' : 'bg-cards cursor-pointer hover:bg-[#ffffff20]'}`}>Extra Fees</button>
                                        </div>
                                        <div className='flex gap-x-2 text-sm items-center'><MdReport /> Report Product</div>
                                    </div>
                                    <Tabs product={product} page={bottomPanel} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default ItemView;