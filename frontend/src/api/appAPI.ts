import apiWithTag from './api';

export const appAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: ({id}) => ({
        url:   `/users/${id}`,
        method: 'GET',
      })
    }),
    getUserPodcast: builder.query({
      query: ({ id}) => ({
        url: `/user/${id}/podcasts`,
        method: 'GET'
      })
    }),
    getPodcastSources: builder.query({
      query: ({ id}) => ({
        url: `/podcast/${id}/sources`,
        method: 'GET'
      })
    })
  })
})

export const { useGetUserDetailsQuery, useGetUserPodcastQuery, useGetPodcastSourcesQuery } = appAPI;