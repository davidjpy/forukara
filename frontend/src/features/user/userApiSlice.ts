import { apiSlice } from '@app/apiSlice';
import { User } from '@common/utilities/types';
import { setUserInfo } from '@features/auth/authSlice';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createUser: builder.mutation<User, Partial<User>>({
            query: ({ ...data }) => ({
                url: '/users',
                method: 'POST',
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {

                }
            }
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

        getUserByUsername: builder.query<User, string>({
            query: (username) => ({
                url: `/users/${username}`,
                method: 'GET',
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            transformResponse: (rawResult: { message: User }) => {
                return rawResult.message;
            },
        }),

        getAccountById: builder.query<User, string>({
            query: (id) => ({
                url: `/users/account/${id}`,
                method: 'GET',
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            transformResponse: (rawResult: { message: User }) => {
                return rawResult.message;
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserInfo(data));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
    })
});

export const {
    useCreateUserMutation,
    useResendEmailMutation,
    useGetUserByUsernameQuery,
    useGetAccountByIdQuery
} = userApiSlice;