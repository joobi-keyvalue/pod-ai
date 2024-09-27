import apiWithTag from './api';

export const verifyOtpAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: '/verify-otp',
        method: 'POST',
        body
      })
    })
  })
})

export const { useVerifyOtpMutation } = verifyOtpAPI;