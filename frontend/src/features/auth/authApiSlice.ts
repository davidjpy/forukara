// import { createSelector, createEntityAdapter, EntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from '@app/apiSlice';
import { setUserInfo, setcredantial, logout } from '@features/auth/authSlice';

interface IResponse {
    token: string;
    user: User,
}

type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    status: 'Pending' | 'Active';
    createdAt: Date;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createUser: builder.mutation<User, Partial<User>>({
            query: ({ ...data }) => ({
                url: '/users',
                method: 'POST',
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            })
        }),

        resendEmail: builder.mutation<any, Partial<User>>({
            query: (data) => ({
                url: '/users/verifications/resend',
                method: 'POST',
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            })
        }),

        login: builder.mutation<IResponse, Partial<User>>({
            query: ({ ...data }) => ({
                url: '/auth/login/',
                method: 'POST',
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            transformResponse: (rawResult: { message: IResponse }) => {
                return rawResult.message;
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setcredantial(data.token));
                    dispatch(setUserInfo(data.user));
                } catch (err) {
                    console.error(err);
                }
            }
        }),

        refresh: builder.query<IResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            transformResponse: (rawResult: { message: IResponse }) => {
                return rawResult.message;
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setcredantial(data.token));
                    dispatch(setUserInfo(data.user));
                } catch (err) {
                    console.error(err);
                }
            }
        }),
        
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout/',
                method: 'POST',
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logout());
                    dispatch(authApiSlice.util.resetApiState());
                } catch (err) {
                    console.error(err);
                }
            }
        })
    })
});

export const {
    useCreateUserMutation,
    useResendEmailMutation,
    useLoginMutation,
    useRefreshQuery,
    useLogoutMutation
} = authApiSlice;



