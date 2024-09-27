import apiWithTag from './api';

export const loginAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: '/verify-otp',
        method: 'POST',
        body,
      }),
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: '/create-user',
        method: 'POST',
        body,
      }),
    }),
    getTopics: builder.query({
      query: () => ({
        url: '/topics',
      }),
      providesTags: ['TOPICS']
    }),
    addTopic: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: `/users/${userId}/topics`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TOPICS']
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useCreateUserMutation,
  useGetTopicsQuery,
  useAddTopicMutation,
} = loginAPI;
