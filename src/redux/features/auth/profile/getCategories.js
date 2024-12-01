import { apiSlice } from "../../../api/apiSlice";

const getCategories = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category", // Define the GET request endpoint for categories
      method: "GET",
      providesTags: ["Category"]
    })
  })
});

export const { useGetCategoriesQuery } = getCategories;
