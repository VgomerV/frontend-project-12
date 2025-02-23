import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getRoute from '../utilites/routes';

const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getRoute('channels'),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
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
    addChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, channel }) => ({
        url: id,
        method: 'PATCH',
        body: channel,
      }),
    }),
  }),
});

export const {
  useFetchChannelsQuery,
  useRemoveChannelMutation,
  useEditChannelMutation,
} = channelsApi;

export default channelsApi;
