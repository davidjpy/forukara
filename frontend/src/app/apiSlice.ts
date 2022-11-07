import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3500', credentials: 'include' }),
    tagTypes: ['User', 'Post', 'Comment'],
    endpoints: builder => ({})
});