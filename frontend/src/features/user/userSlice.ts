import { apiSlice } from '@app/apiSlice';

import { User } from '@common/utilities/types';

// export const userApiSlice = apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         getUserByUsername: builder.query<User, string>({
//             query: (username) => ({
//                 url: `users/${username}`,
//                 method: 'GET',
//                 validateStatus: (response, result) =>
//                     (response.status === 200 || response.status === 201) && !result.isError
//             }),
//             transformResponse: (rawResult: { message: User }) => {
//                 return rawResult.message;
//             }
//         })
//     })
// });

// export const {
//     useGetUserByUsernameQuery
// } = userApiSlice;