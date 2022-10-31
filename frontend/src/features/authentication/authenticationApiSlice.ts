// import { createSelector, createEntityAdapter, EntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from '@app/apiSlice';

interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    status: 'Pending' | 'Active';
    createdAt: Date;
}

export const authenticationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserById: builder.query<IUser, string>({
            query: (id) => ({
                url: `/users/id/${id}`,
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError
            }),
        }),
        createUser: builder.mutation<IUser, Partial<IUser>>({
            query: ({ ...data }) => ({
                url: '/users',
                method: 'POST',
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            })
        }),
        resendEmail: builder.mutation<any, Partial<IUser>>({
            query: (data) => ({
                url: '/users/verifications/resend',
                method: 'POST',
                body: data,
                validateStatus: (response, result) => 
                    (response.status === 200 || response.status === 201) && !result.isError
            })
        })
    })
});

export const {
    useGetUserByIdQuery,
    useCreateUserMutation,
    useResendEmailMutation
} = authenticationApiSlice;



