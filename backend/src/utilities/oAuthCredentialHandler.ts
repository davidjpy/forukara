import axios from 'axios';
import qs from 'qs';


// Retrieve access token and refresh token from Google authorization server
export const oAuthCredentialHandler = async (options: any, url: string): Promise<any> => {

    const response = await axios.post(url, qs.stringify(options), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response.data;
}