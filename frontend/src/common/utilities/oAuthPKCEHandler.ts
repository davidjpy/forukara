import { baseUrl } from '@app/apiSlice';
import * as uuid from 'uuid'

// Convert decimal to heximal
const toHex = (dec: number): string => {
    return ('0' + dec.toString(16)).substring(-2);
}

// Generate code verifier
const generateCodeVerifier = (): string => {
    const array = new Uint32Array(13);
    window.crypto.getRandomValues(array);
    return Array.from(array, toHex).join('');
}

// Sha-256 encoding
const sha256 = (plain: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);

    return window.crypto.subtle.digest('SHA-256', data);
}

// Base64url encoding
const base64urlencode = (a: ArrayBuffer): string => {
    let str = '';
    const bytes = new Uint8Array(a);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
    }

    return window.btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

// Generate code challenge
const generateCodeChallengeFromVerifier = async (v: string): Promise<string> => {
    const hashed = await sha256(v);
    const base64encoded = base64urlencode(hashed);

    return base64encoded;
}

// Handle saving code verifier in local storage, and sending code challenge to authorization endpoint
export const oAuthPKCEHandler = async (provider: 'google' | 'linkedin' | 'twitter'): Promise<void> => {

    const randomVerifier = generateCodeVerifier();
    const challenge = await generateCodeChallengeFromVerifier(randomVerifier)
    sessionStorage.setItem('verifier', randomVerifier);

    let endpoint: string;

    // Navigating to authorization endpoint without XHR
    switch(provider) {
        case 'google':
            endpoint = `${baseUrl}/auth/${provider}?challenge=${challenge}`;
            break;
        
        // State is required for Linkedin authorization endpoint
        case 'linkedin':
            const state = uuid.v4();
            sessionStorage.setItem('state', state);
            endpoint = `${baseUrl}/auth/${provider}?challenge=${challenge}`;
            break;
        
        case 'twitter':
            endpoint = `${baseUrl}/auth/${provider}?challenge=${challenge}`;
            break;
    }

    window.location.href = endpoint;
}