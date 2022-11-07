// import { createSelector, createEntityAdapter, EntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from '@app/apiSlice';
import { setUserInfo, setcredantial } from '@features/auth/authSlice';

interface ILoginResponse {
    message: {
        token: string;
        user: User;
    }
}

type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    status: 'Pending' | 'Active';
    createdAt: Date;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserById: builder.query<User, string>({
            query: (id) => ({
                url: `/users/${id}`,
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError
            }),
        }),

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

        login: builder.mutation<ILoginResponse, Partial<User>>({
            query: ({ ...data }) => ({
                url: '/auth/login/',
                method: 'POST',
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: { message: { token, user } } } = await queryFulfilled;
                    dispatch(setUserInfo(user));
                    dispatch(setcredantial(token));
                } catch (err) {
                    console.error(err);
                }
            }
        }),

        refresh: builder.query<string, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            })
        }),
        
        logout: builder.mutation<string, void>({
            query: () => ({
                url: '/auth/logout/',
                method: 'POST',
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            })
        })
    })
});

export const {
    useGetUserByIdQuery,
    useCreateUserMutation,
    useResendEmailMutation,
    useLoginMutation,
    useRefreshQuery,
    useLogoutMutation
} = authApiSlice;



