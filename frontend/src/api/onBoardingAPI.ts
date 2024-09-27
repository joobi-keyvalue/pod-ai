import apiWithTag from './api';

export const loginAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      })
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: '/verify-otp',
        method: 'POST',
        body
      })
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: '/create-user',
        method: 'POST',
        body
      })
    })
  })
})

export const { useLoginMutation, useVerifyOtpMutation, useCreateUserMutation } = loginAPI;