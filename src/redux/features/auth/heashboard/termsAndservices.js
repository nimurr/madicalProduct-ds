import { apiSlice } from "../../../api/apiSlice";

 
const getTermsAndService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndService: builder.query({
      query: () => "/info/terms-services",  
      method: "GET"
    })
  })
});

export const { useGetTermsAndServiceQuery } = getTermsAndService;

 