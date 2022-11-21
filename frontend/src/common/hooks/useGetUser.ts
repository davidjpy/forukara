import { useAppSelector } from '@app/hooks';
import { useGetUserByIdQuery, useRefreshQuery } from '@features/auth/authApiSlice';


export const useGetUser = (): any => {
    useRefreshQuery();
    const user = useAppSelector(state => state.auth.user);
    const { isLoading, isFetching, isSuccess } = useGetUserByIdQuery(user.id as string, { skip: !user.id });

    return [user, isLoading, isFetching, isSuccess];
}