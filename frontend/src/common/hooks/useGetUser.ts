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
        let code: (string | null) = searchParams.get('code');
        
        const loginUser = async (code: string): Promise<void> => {
            setSearchParams({});
            
            await login({ 
                authorizationCode: code,  
                codeVerifier: sessionStorage.getItem('verifier') as string
            });

            sessionStorage.removeItem('verifier');
        }

        if (!user.id && code) {
            loginUser(code);
        }
    }, []);

    return [user, isLoading, isFetching, isSuccess];
}