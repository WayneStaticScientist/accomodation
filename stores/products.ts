import { ProductResult } from "@/pages/api/userdata/product";
import { create } from "zustand";

export const useProducts = create<ProductResult[]>(() => ([]))
export const useProduct = create<ProductResult>(() => ({
    _id: {},
    owner: '',
    title: '',
    description: '',
    price: 0,
    city: '',
    installements: '',
    payments_options: [],
    images: [],
    country: '',
    user: {
        user: {
            id: "",
            email: "",
            password: "",
            role: [],
            name: "",
            surname: "",
            phone: "",
            address: "",
            city: "",
            id_number: "",
            documents: "",
            profile: "",
            device: "",
            country: ""
        },
        email: "",
        sales: 0,
        unread_messages: 0,
        reports: 0,
        comments_counts: 0,
        followers_count: 0,
        views_count: 0,
        likes_count: 0,
        icoins: 0,
        channels: []
    },
    likes: 0,
    broker: '',
}))