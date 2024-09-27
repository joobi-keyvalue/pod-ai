import apiWithTag from './api';

export const getDetailsAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: ({id}) => ({
        url:   `/users/${id}`,
        method: 'GET',
      })
    }),
  })
})

export const { useGetUserDetailsQuery } = getDetailsAPI;