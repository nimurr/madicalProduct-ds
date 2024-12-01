import { apiSlice } from "../../../api/apiSlice";

 
const getAboutUs = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => "/info/about-us",  
      method: "GET"
    })
  })
});

export const { useGetAboutUsQuery } = getAboutUs;

 