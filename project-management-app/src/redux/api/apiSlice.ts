import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { store } from 'redux/Store';
import { config } from '../../config';

// const baseQuery = {
//   baseUrl: config.api.url,
//   // credantials: 'include',
//   prepareHeaders: (headers: Headers) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     headers.set('Accept', 'application/json');
//     headers.set('Content-type', 'application/json');
//     return headers;
//   },
// };

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: config.api.url }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({ query: () => 'users' }),
  }),
});

export const { useGetAllUsersQuery } = apiSlice;
