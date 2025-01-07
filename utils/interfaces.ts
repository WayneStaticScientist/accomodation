import { DBUser } from "@/pages/api/userdata/user";
export interface PageResult {
    page_title: string,
    user: DBUser,
    page_path: string,
    onwer: string,
    page_summary: string,
}