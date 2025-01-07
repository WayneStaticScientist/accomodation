import { DBUser } from "./user";

export default interface Product {
    id: string;
    owner: string
    title: string
    description: string;
    price: number;
    summary: string;
    city: string;
    installements: string,
    payments_options: { name: string }[],
    images: string[]
    country: string;
    user: DBUser,
    likes: number
    broker: string,
}
export interface OneProduct {
    message: string,
    product: ProductResult
}
export interface ProductResult {
    _id: object;
    owner: string
    title: string
    description: string;
    price: number;
    city: string;
    installements: string,
    payments_options: { name: string }[],
    images: string[]
    country: string;
    user: DBUser,
    likes: number,
    views: number,
    comments_count: number,
    summary: string
    broker: string,
}
export interface MarketUpload {
    refresh_token: string,
    product_item: Product,
}