import { createCodeVerifier } from '@common/utilities/createCodeVerifier';
import { createSha256Hash } from '@common/utilities/createSha256Hash';
import { baseUrl } from '@app/apiSlice';

// Handle saving code verifier in local storage, and sending code challenge to authorization endpoint
export const oAuthPKCEHandler = async (url: string, length: number): Promise<void> => {
    const codeVerifier = createCodeVerifier(length);
    const codeChallenge = await createSha256Hash(codeVerifier);
    sessionStorage.setItem('verifier', codeVerifier);

    // Navigating to authorization endpoint without XHR
    const endpoint = `${baseUrl}${url}?challenge=${codeChallenge}`;
    window.location.href = endpoint;
}