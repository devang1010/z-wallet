import CryptoJS from "crypto-js";
// require('dotenv').config();
const REACT_APP_AES_SECRET = (import.meta as any).env.VITE_REACT_APP_AES_SECRET;

export function encryptData(data: any) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), `${REACT_APP_AES_SECRET}`).toString();
    return encrypted;
}

export function decryptData(data: string) {
    const bytes = CryptoJS.AES.decrypt(data, `${REACT_APP_AES_SECRET}`);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}

export function SHA256Hash(pwd: string) {
    const hash = CryptoJS.SHA256(pwd).toString();
    return hash.toString();
}

