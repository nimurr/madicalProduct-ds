import { apiSlice } from "../../../api/apiSlice";

const getAllNotification = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => "/info/notifications",  
      method: "GET",
    }),

  })
});

export const { useGetAllNotificationQuery } = getAllNotification;