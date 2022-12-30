import axios from 'axios';
import qs from 'qs';

type CredentialResult = {
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: Number;
    scope: string;
    token_type: string;
}

// Retrieve access token and refresh token from Google authorization server
export const oAuthCredentialHandler = async (code: string, verifier: string): Promise<CredentialResult> => {
    const url = 'https://oauth2.googleapis.com/token';

    console.log(`code: ${code}, verifier: ${verifier}`);

    const options = {
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code_verifier: verifier,
        // code_verifier: 'c51a6ff9a4bf12b1853a1ef543d8cc72d10d4dd4a26e516a2bdebd49',
        redirect_uri: process.env.CLIENT_HOST,
        grant_type: 'authorization_code'
    };

    const response = await axios.post<CredentialResult>(url, qs.stringify(options), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response.data;
}