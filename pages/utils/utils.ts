// /c:/Users/User/Documents/cut_accomodation/accomodation/pages/utils/utils.ts

export class HttpError extends Error {
    constructor(public status: number, public statusText: string, public url: string) {
        super(`HTTP Error: ${status} ${statusText} at ${url}`);
        this.name = 'HttpError';
    }
}

export async function handleHttpErrors(response: Response): Promise<Response> {
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText, response.url);
    }
    return response;
}

export async function registerUser(data: object): Promise<object | string> {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_STATIC_REGISTER_URI}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        await handleHttpErrors(api);
        return await api.json()
    } catch (error) {
        if (error instanceof HttpError) {
            return error.message
        } else {
            return 'An unknown error occurred'
        }
    }
}