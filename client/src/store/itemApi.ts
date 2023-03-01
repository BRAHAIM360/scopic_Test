import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./userApi";

export interface itemInterface {
  id?: number;
  name?: string;
  description?: string;
  start_price?: number;
  starting_Date?: Date;
  ending_Date?: Date;
  image?: string;
}

export const itemApi = createApi({
  reducerPath: "item",
  baseQuery,
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (params = "") => `/items/${params}`,
    }),

    getItem: builder.query({
      query: (id) => `/items/${id}`,
      providesTags: ["Items"],
    }),

    addItem: builder.mutation({
      query(item: itemInterface) {
        return {
          url: `/items/`,
          method: "POST",
          body: item,
        };
      },
      invalidatesTags: ["Items"],
    }),

    updateItem: builder.mutation({
      query(item: itemInterface) {
        return {
          url: `/items/${item.id}/`,
          method: "PATCH",
          body: item,
        };
      },
      invalidatesTags: ["Items"],
    }),

    deleteItem: builder.mutation({
      query: (id: number) => ({
        url: `/items/${id}/`,
        method: `DELETE`,
        body: id,
      }),
      invalidatesTags: ["Items"],
    }),
    deleteItems: builder.mutation({
      query: (items: number[]) => ({
        url: `/items/`,
        method: `DELETE`,
        body: items,
      }),
      invalidatesTags: ["Items"],
    }),
  }),
  //to disable caching
  keepUnusedDataFor: 0,
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useDeleteItemsMutation,
} = itemApi;
