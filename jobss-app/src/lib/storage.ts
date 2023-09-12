import { getCookie, setCookie } from 'typescript-cookie';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from './utils';

export const setItem = (name: string, value: any, secured: boolean = false) => {
    if (secured) {
        setCookie(name, encrypt(value), { expires: 1, path: '' });
        return;
    }
    setCookie(name, JSON.stringify(value), { expires: 1, path: '' });
}

export const getItem = (name: string, secured: boolean): string | undefined => {
    if (secured) {
        const encrypted = getCookie(name) || "";
        return decrypt(encrypted);
    }
    return getCookie(name) || "";
}

export const encrypt = (value : any) : string => {
    return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
}

export const decrypt = (value : any) => {
    return CryptoJS.AES.decrypt(value, SECRET_KEY).toString(CryptoJS.enc.Utf8);
}