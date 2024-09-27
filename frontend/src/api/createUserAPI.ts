import apiWithTag from './api';

export const createUserAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => ({
        url: '/create-user',
        method: 'POST',
        body
      })
    })
  })
})

export const { useCreateUserMutation } = createUserAPI;