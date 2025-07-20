import { apiSlice } from "../../../api/apiSlice";

const adminsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        addAdmin: builder.mutation({
            query: (data) => ({
                url: "/admin/create-admin",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Admins"]
        }),
        getAdmins: builder.query({
            query: (type) => ({
                url: `/users/all?role=${type}`,
                method: "GET"
            }),
            providesTags: "Admins",

        }),

    })
});
export const {
    useAddAdminMutation,
    useGetAdminsQuery
} = adminsApi;