import apiWithTag from './api';

export const loginAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      })
    })
  })
})

export const { useLoginMutation } = loginAPI;