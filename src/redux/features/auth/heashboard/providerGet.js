import { apiSlice } from "../../../api/apiSlice";

const getAllProvider = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProvider: builder.query({
      query: () => "/users/all?role=provider",  
      method: "GET"
    })
  })
});

export const { useGetAllProviderQuery } = getAllProvider;