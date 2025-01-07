import { DBUser } from "@/pages/api/userdata/user";
import { create } from "zustand";

const useUser = create<DBUser>(() => ({
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
    email: '',
    followers_count: 0,
    views_count: 0,
    likes_count: 0,
    icoins: 0,
    sales: 0,
    channels: [],
    unread_messages: 0,
    reports: 0,
    comments_counts: 0,
    // Add default values for the remaining properties of DBUser
}));

export default useUser