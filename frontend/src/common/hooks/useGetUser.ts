import { useAppSelector } from '@app/hooks';
import { useRefreshQuery } from '@features/auth/authApiSlice';
import { useGetAccountByIdQuery } from '@features/user/userApiSlice';

export const useGetUser = (): any => {
    useRefreshQuery();
    const user = useAppSelector(state => state.auth.user);
    const { isLoading, isFetching, isSuccess } = useGetAccountByIdQuery(user.id as string, { skip: !user.id });

    return [user, isLoading, isFetching, isSuccess];
}