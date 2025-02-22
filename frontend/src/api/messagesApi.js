import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getRoute from '../utilites/routes.js';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getRoute('messages'),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    fetchMessages: builder.query({
      query: () => '',
      providesTags: ['Message'],
    }),
  }),
});

export const { useFetchMessagesQuery } = messagesApi;
export default messagesApi;
