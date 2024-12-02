import { apiSlice } from "../../../api/apiSlice";

const getSubCategories = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: ({ id, categoryName }) => `/category/sub-categorys?categorieId=${id}&categoryName=${categoryName}`, // Dynamic URL with query parameters
      method: "GET",
      providesTags: ["Category"]
    })
  })
});

export const { useGetSubCategoriesQuery } = getSubCategories;
