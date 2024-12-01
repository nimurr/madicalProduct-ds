import { apiSlice } from "../../../api/apiSlice";

 
const getPrivacyAndPolicy = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyAndPolicy: builder.query({
      query: () => "/info/privacy-policy",  
      method: "GET"
    })
  })
});

export const { useGetPrivacyAndPolicyQuery } = getPrivacyAndPolicy;

 