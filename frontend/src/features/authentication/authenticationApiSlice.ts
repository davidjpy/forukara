import { createSelector, createEntityAdapter, EntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from '@app/apiSlice';

interface IUser {
    _id: string;
    username: string;
    email: string;
    status: 'Pending' | 'Active';
    createdAt: Date;
}

export const authenticationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserById: builder.query<IUser, string>({
            query: (id) => {
                return {
                    url: `/users/id/${id}`,
                    validateStatus: (response, result) => 
                        response.status === 200 && !result.isError
                }
            },   
        })
    })
});

export const {
    useGetUserByIdQuery
} = authenticationApiSlice;



