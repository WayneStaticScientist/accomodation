export default interface User {
    id: string;
    email: string;
    password: string;
    role: string[];
    name: string;
    surname: string;
    phone: string;
    address: string;
    city: string;
    id_number: string;
    documents: string;
    profile: string;
    device: string;
    country: string;
}
export interface Channel {
    id: string,
    name: string,
    banner: string,
}
export interface DBUser {
    user: User,
    email: string,
    sales: number,
    unread_messages: number,
    reports: number,
    comments_counts: number,
    followers_count: number,
    views_count: number,
    likes_count: number,
    icoins: number,
    channels: Channel[],
}