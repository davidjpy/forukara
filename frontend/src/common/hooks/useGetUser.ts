import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@app/hooks';
import { useRefreshQuery } from '@features/auth/authApiSlice';
import { useLoginMutation } from '@features/auth/authApiSlice';
import { useGetAccountByIdQuery } from '@features/user/userApiSlice';

export const useGetUser = (): any => {

    const timestampRef = useRef<number>(Date.now());
    const [searchParams, setSearchParams] = useSearchParams();
    const [login,] = useLoginMutation();
    const user = useAppSelector(state => state.auth.user);

    useRefreshQuery({ sessionId: timestampRef.current });
    const { isLoading, isFetching, isSuccess } = useGetAccountByIdQuery(user.id as string, { skip: !user.id });

    // Login user if the url contain the login token returned by OAuth
    useEffect(() => {
        // Remove all query params and all client identifiers in session storage
        const resetState = (): void => {
            searchParams.delete('code');
            searchParams.delete('state');
            sessionStorage.removeItem('verifier');
            sessionStorage.removeItem('state');
            setSearchParams({});
        }

        // Login user with authorization code and code verifier
        const loginUser = async (code: string): Promise<void> => {
            await login({
                auth: 'oauth',
                body: {
                    authorizationCode: code,
                    codeVerifier: sessionStorage.getItem('verifier') as string
                }
            });
        }

        let sameClient: boolean = true;
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        // Check for any potential CSFR attack
        if (state && state !== sessionStorage.getItem('state')) {
            sameClient = false;
            resetState();
        }

        if (!user.id && code && sameClient) {
            loginUser(code);
            resetState();
        }
    }, []);

    return [user, isLoading, isFetching, isSuccess];
}