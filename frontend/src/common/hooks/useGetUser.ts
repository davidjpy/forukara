import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@app/hooks';
import { useRefreshQuery } from '@features/auth/authApiSlice';
import { useLoginMutation } from '@features/auth/authApiSlice';
import { useGetAccountByIdQuery } from '@features/user/userApiSlice';

export const useGetUser = (): any => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [login,] = useLoginMutation();
    const user = useAppSelector(state => state.auth.user);
    useRefreshQuery();
    const { isLoading, isFetching, isSuccess } = useGetAccountByIdQuery(user.id as string, { skip: !user.id });

    // Login user if the url contain the login token returned by OAuth
    useEffect(() => {
        let code: (string | null) = searchParams.get('code');
        
        const loginUser = async (code: string): Promise<void> => {
            console.log('OAuth login')
            setSearchParams({});
            await login({ code: code });
        }

        if (!user.id && code) {
            loginUser(code);
        }
    }, []);

    return [user, isLoading, isFetching, isSuccess];
}