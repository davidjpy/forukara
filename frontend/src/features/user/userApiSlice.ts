import { apiSlice } from '@app/apiSlice';
import { setUserInfo } from '@features/auth/authSlice';
import { User } from '@common/utilities/types';

export const userApiSlice = apiSlice.injectEndpoints({
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

        getUser: builder.query<User, string>({
            query: (id) => ({
                url: `auth/user/${id}`,
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
            }
        }),
    })
})

export const {
    useCreateUserMutation,
    useResendEmailMutation,
    useGetUserQuery
} = userApiSlice;