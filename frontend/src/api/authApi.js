import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getRoute from '../utilites/routes';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: getRoute('login'),
        method: 'POST',
        body: { username, password },
      }),
    }),
    signup: builder.mutation({
      query: ({ username, password }) => ({
        url: getRoute('signup'),
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
export default authApi;
