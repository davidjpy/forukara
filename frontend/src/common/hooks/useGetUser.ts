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

    // Login user if the url contain the login token returned by oauth
    useEffect(() => {
        let loginToken: (string | null) = searchParams.get('token');

        const loginUser = async (loginToken: string): Promise<void> => {
            await login({ token: loginToken });
            searchParams.delete('token');
            setSearchParams({});
        }

        if (!user.id && loginToken) {
            loginUser(loginToken);
        }
    }, []);

    useRefreshQuery();
    const { isLoading, isFetching, isSuccess } = useGetAccountByIdQuery(user.id as string, { skip: !user.id });

    return [user, isLoading, isFetching, isSuccess];
}