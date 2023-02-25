import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

let user = JSON.parse(localStorage.getItem("user") || "{}");

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.accessToken) {
      headers.set("authorization", `Bearer ${user.accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};
