import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@app/store';

export const baseUrl = 'http://127.0.0.1:3500';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseUrl, 
        credentials: 'include',
        prepareHeaders:(headers, api) => {
            const token = (api.getState() as RootState).auth.credantial;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['User', 'Post', 'Comment'],
    endpoints: builder => ({})
});