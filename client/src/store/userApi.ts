import { createApi } from "@reduxjs/toolkit/query/react";

import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.access_token) {
      headers.set("authorization", `Bearer ${user.access_token}`);
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "user",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/users/me`,
      providesTags: ["User"],
    }),

    getNotification: builder.query({
      query: () => `/users/notifications`,
    }),

    editConfig: builder.mutation({
      query(config: {
        bid_amount: number;
        max_bid: number;
        bid_alert: number;
      }) {
        return {
          url: `/users/config`,
          method: "PATCH",
          body: config,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
  //to disable caching
  keepUnusedDataFor: 0,
});

export const { useGetMeQuery, useEditConfigMutation, useGetNotificationQuery } =
  userApi;
