import { useEffect, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@app/hooks';
import { useLoginMutation, useRefreshQuery } from '@features/auth/authApiSlice';
import { useGetAccountByIdQuery } from '@features/user/userApiSlice';
import { User, AuthProvider } from '@common/utilities/types';

export const useGetUser = (): [User, boolean, boolean] => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [login, loginResult] = useLoginMutation();
    const user = useAppSelector(state => state.auth.user);
    const [isAuthing, setIsAuthing] = useState<boolean>(false);

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

    // Set autheticating to true if user redirected from the consent screen
    useLayoutEffect(() => {
        const code = searchParams.get('code');

        if (code) {
            setIsAuthing(true);
        }
    }, []);

    // Set autheticating to false if successed
    useEffect(() => {
        if (loginResult.isSuccess) {
            setIsAuthing(false);
        }
    }, [loginResult]);

    // Create session id to prevent RTK default cache behavior from getting user info after logout
    useRefreshQuery({ sessionId: localStorage.getItem('session') as string }, { skip: !localStorage.getItem('session') });
    const { isLoading: isUserLoading, isFetching: isUserFetching, isSuccess: isUserSuccess } = useGetAccountByIdQuery(user.id as string, { skip: !user.id });

    // Set loading to true if isLoading, isFetching and user is authenticated, and set loading to false if user info is fetched
    const isLoading = Boolean((isUserLoading || isUserFetching || localStorage.getItem('auth')) && !isUserSuccess);

    return [user, isLoading, isAuthing];
}