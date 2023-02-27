import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./queryApi";

interface itemInterface {
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
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (page = 1, limit = 10) => `/items/`,
      providesTags: (result = [], error, arg) => [
        "Items",
        ...result.items.map(({ id }: { id: number }) => ({
          type: "Items",
          id,
        })),
      ],
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
  }),
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} = itemApi;
