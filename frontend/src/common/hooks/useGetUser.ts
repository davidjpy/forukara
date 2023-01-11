import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@app/hooks';
import { useRefreshQuery } from '@features/auth/authApiSlice';
import { useLoginMutation } from '@features/auth/authApiSlice';
import { useGetAccountByIdQuery } from '@features/user/userApiSlice';
import { User, AuthProvider } from '@common/utilities/types';

type UserFetch = [User, boolean, boolean, boolean];

export const useGetUser = (): UserFetch => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [login,] = useLoginMutation();
    const user = useAppSelector(state => state.auth.user);

    // Login user if the url contain the login token returned by OAuth
    useEffect(() => {
        // Remove all query params and all client identifiers in session storage
        const resetState = (): void => {
            searchParams.delete('code');
            searchParams.delete('state');
            sessionStorage.removeItem('verifier');
            sessionStorage.removeItem('state');
            sessionStorage.removeItem('provider');
            setSearchParams({});
        }

        // Login user with authorization code and code verifier
        const loginUser = async (code: string): Promise<void> => {
            const verifier = sessionStorage.getItem('verifier') as string;
            const provider = sessionStorage.getItem('provider') as AuthProvider;

            switch (provider) {
                // Google login requires PKCE code verifer 
                case 'google':
                    await login({
                        auth: { mode: 'oauth', provider: provider },
                        body: {
                            authorizationCode: code,
                            codeVerifier: verifier
                        }
                    });
                    break;

                // Linkedin requires state checking in client application
                case 'linkedin':
                    await login({
                        auth: { mode: 'oauth', provider: provider },
                        body: {
                            authorizationCode: code,
                        }
                    });
                    break;
            }
        }

        let sameClient: boolean = true;
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        // Check for any potential CSFR attack by comparing the state
        if (state && state !== sessionStorage.getItem('state')) {
            sameClient = false;
        }

        if (!user.id && code && sameClient) {
            loginUser(code);
        }
        
        resetState();
    }, []);

    // Create session id to prevent RTK default cache behavior from getting user info after logout
    useRefreshQuery({ sessionId: localStorage.getItem('session') as string }, { skip: !localStorage.getItem('session') });
    const { isLoading, isFetching, isSuccess } = useGetAccountByIdQuery(user.id as string, { skip: !user.id });

    return [user, isLoading, isFetching, isSuccess];
}