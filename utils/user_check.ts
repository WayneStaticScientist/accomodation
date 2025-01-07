import { getXLink } from "@/pages/utils/utils";
import { User } from "next-auth";

export function isRegistered(user: User) {
    if (!user) return
    if (user.email) {
        if (user.email.length > 0 && getXLink()) {
            if (getXLink().length > 0) {
                return true;
            }
        }
    }
    return false
}