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
  tagTypes: ["item"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (params = "") => `/items/${params}`,
    }),

    getItem: builder.query({
      query: (id) => `/items/${id}`,
      providesTags: ["item"],
    }),

    addItem: builder.mutation({
      query(item: itemInterface) {
        return {
          url: `/items/`,
          method: "POST",
          body: item,
        };
      },
      invalidatesTags: ["item"],
    }),

    updateItem: builder.mutation({
      query(item: itemInterface) {
        return {
          url: `/items/${item.id}/`,
          method: "PATCH",
          body: item,
        };
      },
      invalidatesTags: ["item"],
    }),

    deleteItem: builder.mutation({
      query: (id: number) => ({
        url: `/items/${id}/`,
        method: `DELETE`,
        body: id,
      }),
      invalidatesTags: ["item"],
    }),
    deleteItems: builder.mutation({
      query: (items: number[]) => ({
        url: `/items/`,
        method: `DELETE`,
        body: { items },
      }),
      invalidatesTags: ["item"],
    }),
    addbid: builder.mutation({
      query({ itemId, amount }: { itemId: number; amount: number }) {
        return {
          url: `/bid/${itemId}/`,
          method: "POST",
          body: { amount },
        };
      },
      invalidatesTags: ["item"],
    }),

    autobidding: builder.mutation({
      query({ itemId, state }: { itemId: number; state: boolean }) {
        return {
          url: `/bid/autobidding/${itemId}/`,
          method: "PATCH",
          body: { state },
        };
      },
      invalidatesTags: ["item"],
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
  useAddbidMutation,
  useAutobiddingMutation,
} = itemApi;
