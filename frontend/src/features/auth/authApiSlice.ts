import { apiSlice } from '@app/apiSlice';
import { setUserInfo, setCredantial, logout } from '@features/auth/authSlice';
import { User, LoginResponse, RefreshResponse, OAuthLogin } from '@common/utilities/types';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, Partial<User> | Partial<OAuthLogin>>({
            query: ({ ...data }) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            transformResponse: (rawResult: { message: LoginResponse }) => {
                return rawResult.message;
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredantial(data.token));
                    dispatch(setUserInfo(data.user!));
                } catch (err) {
                    console.error(err);
                }
            }
        }),

        refresh: builder.query<RefreshResponse, { sessionId: number }>({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            transformResponse: (rawResult: { message: RefreshResponse }) => {
                return rawResult.message;
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredantial(data.token));
                    dispatch(setUserInfo({ id: data.id }));
                } catch (err) {
                    console.error(err);
                }
            }
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(authApiSlice.util.resetApiState());
                    dispatch(logout());
                } catch (err) {
                    console.error(err);
                }
            }
        }),
    })
});

export const {
    useLoginMutation,
    useRefreshQuery,
    useLogoutMutation,
} = authApiSlice;



