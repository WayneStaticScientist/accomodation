import { ProductResult } from '@/pages/api/userdata/product';
import { getProducts } from '@/pages/utils/utils';
import { useProducts } from '@/stores/products';
import useUser from '@/stores/userstore';
import { Divider } from 'primereact/divider';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useState } from 'react';
import { TipperCard } from '../../card';
import { MenuItem } from 'primereact/menuitem';
import { FaEdit, FaShareAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import router from 'next/router';

const Page_1: React.FC = () => {
    const products = useProducts();
    const { email } = useUser();
    const [loading, setLoading] = useState(products.length > 0);
    const fetchProducts = async (page: number) => {
        setLoading(true)
        let products = await getProducts(page, 'owner', email)
        if (typeof products == 'string') {
            console.log(products)
        } else {
            products = Object.values(products);
            console.log(products)
            useProducts.setState(products as ProductResult[])
            console.log(typeof products)
        }
        setLoading(false)
    }
    useEffect(() => {
        if (products.length == 0) {
            fetchProducts(1)
        } else {
            setLoading(false)
        }
    }, [])
    const menus: MenuItem[] = [
        {
            label: "Edit",
            icon: <FaEdit />
        },
        {
            label: "Share",
            icon: <FaShareAlt />
        },
        {
            label: "Delete",
            icon: <MdDelete />
        },
    ]
    return (<>
        {loading ? (<div className='flex w-full h-full justify-center items-center flex-col'>
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--background)" animationDuration=".5s" />
            loading..
        </div >)
            : (<div className='p-3 select-none'>
                <div className='text-xl font-bold mt-12'>Your Uploads</div>
                <p className='text-xs text-gray-500 mt-5'>This is some of your products uploaded online .The data is offered in paginations for low resources usage</p>
                <Divider />
                {products.length == 0 ? (<div className='flex items-center justify-center w-full h-full '>No Products Uploaded</div>)
                    : (<div className='grid grid-cols-4 gap-5'>{Object.values(products).map((e, i) => {
                        return <TipperCard onClick={() => {
                            const id = e._id as { $oid: string }
                            router.push("/catalogs/" + id.$oid)
                        }} menuItems={menus}
                            key={i}
                            hint={e.title}
                            amount={e.price}
                            Summary={e.summary}
                            count={e.views}
                            imagePath={e.images.length > 0 ? e.images[0] : ''} />
                    })}</div>)}
            </div>)}</>)
};

export default Page_1;