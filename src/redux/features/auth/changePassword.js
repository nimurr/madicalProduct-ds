import { apiSlice } from "../../api/apiSlice";

const changePassword = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (data) => ({
                url: `/auth/change-password`,
                method: "POST",
                body: data
            })
        }),
        updatePaddword: builder.mutation({
            query: (data) => ({
                url: `/auth/reset-password`,
                method: "POST",
                body: data
            })
        })
    })
})

export const { useChangePasswordMutation, useUpdatePaddwordMutation } = changePassword;