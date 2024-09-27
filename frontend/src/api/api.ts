import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const podAPI = createApi({
  reducerPath: 'podaiAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://194d-103-138-236-18.ngrok-free.app',
    prepareHeaders: (headers) => {
      // Retrieve the token from the state (assuming it's stored in the auth slice)
      const token = localStorage.getItem('token');

      console.log('token', token);
      // If a token exists, add it to the headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

const apiWithTag = podAPI.enhanceEndpoints({
  addTagTypes: [],
});

export default apiWithTag;
