// /c:/Users/User/Documents/cut_accomodation/accomodation/pages/utils/utils.ts
import { v4 as uuidv4 } from 'uuid';
import User, { DBUser } from '../api/userdata/user';
import { OneProduct, ProductResult } from '../api/userdata/product';
import axios, { AxiosProgressEvent } from 'axios';
export class HttpError extends Error {
    constructor(public status: number, public statusText: string, public url: string) {
        super(`HTTP Error: ${status} ${statusText} at ${url}`);
        this.name = 'HttpError';
    }
}

export async function handleHttpErrors(response: Response): Promise<object | string> {
    if (!response.ok) {
        if (response.status >= 500) {
            return "Internal server error occured"
        }
        if (response.status == 404) {
            return "Resource not found"
        }
        if (typeof response === 'object' && 'status' in response && response.status == 403) {
            return await response.json()
        }
        const { message } = await response.json();
        return message
    }
    return await response.json();
}

export async function registerUser(data: User): Promise<object | string> {
    try {

        const api = await fetch(`${process.env.NEXT_PUBLIC_STATIC_SERVER}app/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await handleHttpErrors(api);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return "uknown error occured"
    }
}


export async function loginUser(data: User): Promise<object | string> {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_STATIC_SERVER}app/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await handleHttpErrors(api);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return "uknown error occured"
    }
}


export async function getUser(rerun = true): Promise<DBUser | string | object> {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_STATIC_SERVER}app/auth/get`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                device_id: getDeviceId(),
                refresh_token: "",
                access_token: getXLink(),
            }),
        });
        const response = await handleHttpErrors(api)
        console.log(response)
        if (api.status == 400) {
            delMLink();
            delXLink();
            if (rerun)
                return getUserReEntry();
        }
        if (typeof response === 'string') return response;
        const data = response as { user: User, message: string }

        return data.user;
    } catch (e) {
        return "uknown error occured: " + e
    }
}
async function getUserReEntry(): Promise<User | string | object> {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_STATIC_SERVER}app/auth/new`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                device_id: getDeviceId(),
                refresh_token: getMLink(),
                access_token: getXLink(),
            }),
        });
        const response = await handleHttpErrors(api)
        if (typeof response === 'string') return response;
        if (api.status == 200) {
            const token = response as { message: string, token: object }
            const { access_token, refresh_token } = token.token as { access_token: string, refresh_token: string };
            setXLink(access_token)
            setMLink(refresh_token)
            return getUser(false);
        }
        return response
    } catch (e) {
        return "uknown error occured " + e
    }
}


export async function uploadProduct(form: FormData, progressUpdate: (x: number) => void, onError: (message: string) => void, onFinish: (object: object) => void) {
    try {
        const api = await axios.post(`${process.env.NEXT_PUBLIC_STATIC_SERVER}app/uploadProduct`, form, {
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    progressUpdate(percentCompleted);
                }
            },
        });
        onFinish(api.data);

    } catch (e) {
        onError("uknown error occured " + e)
    }
}
export async function getProducts(page = 1, filterKey = '', filter = '',): Promise<ProductResult[] | string> {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_STATIC_SERVER}app/products/fetch?page=${page}&key_name=${filterKey}&key_value=${filter}`, {
            method: "GET",
        });
        const response = await handleHttpErrors(api)
        if (api.status == 403 || api.status == 401) {
            if (typeof response === 'object' && response !== null && 'message' in response) {
                return response.message as string;
            }
            return "Unauthorized access";
        }
        if (typeof response === 'string') return response;
        if (api.ok) {
            const { products } = response as { products: ProductResult[] }
            return products as ProductResult[];
        }
        return "Unexpected response format";
    } catch (e) {
        return "uknown error occured: " + e
    }
}

export async function getProduct(id: string): Promise<OneProduct | string> {
    if (!id) return "Id is undefined"
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_STATIC_SERVER}app/products/product?id=${id}`, {
            method: "GET",
        });
        const response = await handleHttpErrors(api)
        if (api.status == 403 || api.status == 401) {
            if (typeof response === 'object' && response !== null && 'message' in response) {
                return response.message as string;
            }
            return "Unauthorized access";
        }
        if (typeof response === 'string') return response;
        if (api.ok) {
            return response as OneProduct;
        }
        return "Unexpected response format";
    } catch (e) {
        return "uknown error occured: " + e
    }
}
export function getXLink(): string {
    return localStorage.getItem("xlink") ?? ""
}
export function getMLink(): string {
    return localStorage.getItem("mlink") ?? ""
}
export function setXLink(data: string) {
    localStorage.setItem("xlink", data)
}
export function setMLink(data: string) {
    localStorage.setItem("mlink", data)
}
export function delXLink() {
    //localStorage.removeItem("xlink")
}
export function delMLink() {
    //  localStorage.removeItem("mlink")
}
export const getDeviceId = () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem('deviceId', deviceId);
    }

    return deviceId;
};