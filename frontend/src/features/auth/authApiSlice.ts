import * as uuid from 'uuid'

import { apiSlice } from '@app/apiSlice';
import { setUserInfo, setCredantial, logout } from '@features/auth/authSlice';
import { RefreshResponse, User, AuthProvider } from '@common/utilities/types';

type UserLogin = {
    auth: { mode: 'id' | 'oauth', provider: AuthProvider },
    body: {
        email?: string;
        password?: string;
        authorizationCode?: string;
        codeVerifier?: string;
        codeChallenge?: string;
    }
}

export interface LoginResponse {
    token: string;
    user: User;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, UserLogin>({
            query: (data) => ({
                url: `/auth/login?auth=${data.auth.mode}&provider=${data.auth.provider}`,
                method: 'POST',
                body: data.body,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            transformResponse: (rawResult: { message: LoginResponse }) => {
                return rawResult.message;
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('session', uuid.v4());
                    localStorage.setItem('auth', 'true');
                    dispatch(setCredantial(data.token));
                    dispatch(setUserInfo(data.user!));
                } catch (err) {
                    console.error(err);
                }
            }
        }),

        refresh: builder.query<RefreshResponse, { sessionId: string }>({
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
                    localStorage.setItem('auth', 'true');
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
                    localStorage.removeItem('session');
                    localStorage.removeItem('auth');
                    dispatch(apiSlice.util.resetApiState());
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
    useLazyRefreshQuery,
    useLogoutMutation,
} = authApiSlice;



