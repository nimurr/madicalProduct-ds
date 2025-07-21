import { apiSlice } from "../../../api/apiSlice";

const credentialApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCredential: builder.mutation({
            query: (data) => ({
                url: "/credential/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Credential"],
        }),
        getCredentials: builder.query({
            query: () => ({
                url: "/credential",
                method: "GET",
            }),
            providesTags: ["Credential"],
        }),
        updateCredential: builder.mutation({
            query: (body) => {
                // console.log("Updating Credential ID:", body);
                return {
                    url: `/credential/${body.id}`,
                    method: "PATCH",
                    body: body.formData,
                }
            },
            invalidatesTags: ["Credential"],
        }),
        deleteCredential: builder.mutation({
            query: (id) => ({
                url: `/credential/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Credential"],
        }),
    }),
});
export const {
    useAddCredentialMutation,
    useGetCredentialsQuery,
    useUpdateCredentialMutation,
    useDeleteCredentialMutation,
} = credentialApi;