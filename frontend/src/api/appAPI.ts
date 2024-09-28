import apiWithTag from './api';

export const appAPI = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    getUserPodcast: builder.query({
      query: ({ id }) => ({
        url: `/user/${id}/podcasts`,
        method: 'GET',
      }),
      providesTags: ['PODCASTS'],
    }),
    getPodcastSources: builder.query({
      query: ({ id }) => ({
        url: `/podcast/${id}/sources`,
        method: 'GET',
      }),
      providesTags: ['PODCASTS'],
    }),
    getUserTopics: builder.query({
      query: ({ id }) => ({
        url: `/users/${id}/topics`,
        method: 'GET',
      }),
      providesTags: ['TOPICS'],
    }),
    getPodcastById: builder.query({
      query: ({ id }) => ({
        url: `/podcast/${id}`,
        method: 'GET',
      }),
      providesTags: ['PODCASTS'],
    }),
    likePodcast: builder.mutation({
      query: ({ id }) => ({
        url: `/podcast/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['PODCASTS'],
    }),
    getLikedPodcast: builder.query({
      query: ({ id }) => ({
        url: `/user/${id}/podcasts?is_liked=true`,
        method: 'GET',
      }),
    }),
    createTopics: builder.mutation({
      query: ({ id, prompt }) => ({
        url: '/topics',
        method: 'POST',
        body: {
          prompt,
          user_id: id,
        },
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetUserPodcastQuery,
  useGetPodcastSourcesQuery,
  useGetUserTopicsQuery,
  useGetPodcastByIdQuery,
  useLikePodcastMutation,
  useGetLikedPodcastQuery,
  useCreateTopicsMutation
} = appAPI;
