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
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/admin/delete-admin/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Admins"]
        }),

    })
});
export const {
    useAddAdminMutation,
    useGetAdminsQuery,
    useDeleteAdminMutation
} = adminsApi;