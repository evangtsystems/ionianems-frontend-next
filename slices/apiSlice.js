// slices/apiSlice.js
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice';

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "ionianems1-backend-erdrase6hwexhndz.italynorth-01.azurewebsites.net";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      console.log("✅ Sending API Request with Token:", token);
    } else {
      console.warn("🚨 No Token Found! Requests May Fail.");
    }

    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;

    if (status === 401 || status === 403) {
      console.warn("🚨 Token expired or invalid. Logging out user.");
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User', 'Products', 'Orders'],
  endpoints: () => ({}),
});
