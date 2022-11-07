import { useGetUserByIdQuery } from '@features/auth/authApiSlice';

const useGetUser = (userId: string) => {
    const { data, isLoading, isFetching, isError } = useGetUserByIdQuery(userId);

    return { data, isLoading, isFetching, isError };
}

export default useGetUser;