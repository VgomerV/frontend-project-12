import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getRoute from '../utilites/routes.js';

const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getRoute('channels'),
    prepareHeaders: (headers) => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    fetchChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
  }),
});

export const { useFetchChannelsQuery } = channelsApi;
export default channelsApi;
