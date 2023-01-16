import { apiSlice } from '@app/apiSlice';
import { User, ProfileInfo, ProfileBio } from '@common/utilities/types';
import { setUserInfo } from '@features/auth/authSlice';

type EditProfile = {
    id: string;
    data: FormData | ProfileBio;
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createUser: builder.mutation<User, Partial<ProfileInfo>>({
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
                    console.error(err);
                }
            }
        }),

        resendEmail: builder.mutation<any, Partial<ProfileInfo>>({
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
            providesTags: (result, error, arg) => {
                return result
                    ? [{ type: 'User', id: result.id }]
                    : ['User']
            },
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
            providesTags: ['Account'],
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

        editAccount: builder.mutation<void, EditProfile>({
            query: ({ id, data }) => ({
                url: `/users/account/${id}/info`,
                method: 'PATCH',
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            invalidatesTags: (result, error, arg) => {
                return arg.id ? [{ type: 'User', id: arg.id }, 'Account'] : ['User', 'Account']
            }
        }),

        editBio: builder.mutation<void, EditProfile>({
            query: ({ id, data }) => ({
                url: `/users/account/${id}/bio`,
                method: 'PATCH',
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError
            }),
            invalidatesTags: (result, error, arg) => {
                return arg.id ? [{ type: 'User', id: arg.id }, 'Account'] : ['User', 'Account']
            }
        }),
    })
});

export const {
    useCreateUserMutation,
    useResendEmailMutation,
    useGetUserByUsernameQuery,
    useGetAccountByIdQuery,
    useLazyGetAccountByIdQuery,
    useEditAccountMutation,
    useEditBioMutation,
} = userApiSlice;