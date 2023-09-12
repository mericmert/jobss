import axios, { AxiosError, AxiosResponse } from 'axios';
import { SERVER_URL } from "@/lib/utils";
import { encrypt, setItem } from '@/lib/storage';

type AuthResponse = {
    accessToken: string;
    refreshToken: string;
}


export async function GET(request: Request) {
    const url = new URL(request.url);
    const queryParams = new URLSearchParams(url.search);
    const code = queryParams.get("code");
    if (code) {
        let res: AuthResponse = await exchangeToken(code);
        const refresh_cookie = `session-refresh = ${res.refreshToken}; HttpOnly; Path=/;`;
        const access_cookie = `user-session = ${encrypt(JSON.stringify(res.accessToken))}; Path=/;`
        return new Response(null, {
            status: 302,
            headers: {
                "Location" : "/",
                'Set-Cookie': `${refresh_cookie}, ${access_cookie}`,
            }
        })
    }
}


async function exchangeToken(code: string): Promise<AuthResponse> {
    try {
        let response: AxiosResponse = await axios.get(`${SERVER_URL}/api/v1/users/auth/exchange-token?code=${code}`);
        return response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.log("Something went wrong!");
        }
        return Promise.reject("Token couldn't be exchanged!");
    }
}