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

const url = 'https://oauth2.googleapis.com/token';

// Retrieve access token and refresh token from Google authorization server
export const oAuthCredentialHandler = async (code: string, verifier: string): Promise<CredentialResult> => {

    const options = {
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code_verifier: verifier,
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