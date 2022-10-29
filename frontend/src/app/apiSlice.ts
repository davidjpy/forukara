import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3500' }),
    tagTypes: ['User', 'Post', 'Comment'],
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: `users`,
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
        })
    })
});