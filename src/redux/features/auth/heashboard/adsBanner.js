import { apiSlice } from "../../../api/apiSlice";

const adsBannerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAdsBanner: builder.query({
            query: (status) => ({
                url: `/ads/admon-all?status=${status}`,
                method: "GET",
                providesTags: ["AdsBanner"],
            })
        }),
        getSingleAdsBanner: builder.query({
            query: (id) => ({
                url: `/ads/single/${id}`,
                method: "GET",
                providesTags: ["AdsBanner"],
            })
        }),
        updatePublished: builder.mutation({
            query: ({ id, status }) => ({
                url: `ads/update/${id}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["AdsBanner"],
        }),
        updateDeclime: builder.mutation({
            query: ({ status , declaimedMessage  , id }) => ({
                url: `/ads/update/${id}`,
                method: "PATCH",
                body: { status , declaimedMessage },
            }),
            invalidatesTags: ["AdsBanner"],
        }),
    }),
});

export const {
    useGetAllAdsBannerQuery,
    useGetSingleAdsBannerQuery,
    useUpdatePublishedMutation,
    useUpdateDeclimeMutation,
} = adsBannerApi;


 