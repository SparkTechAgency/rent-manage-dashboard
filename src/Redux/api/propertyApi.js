import { baseApi } from "../baseApi";

const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    properties: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/property/all",
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["properties"],
    }),
    changeStatus: builder.mutation({
      query: ({ propertyId, status }) => {
        console.log(
          "Changing status for propertyId:",
          propertyId,
          "to",
          status
        );
        return {
          url: `/property/verify/${propertyId}`,
          method: "PATCH",
          body: { status },
        };
      },
      invalidatesTags: ["properties"],
    }),
  }),
});

export const { usePropertiesQuery, useChangeStatusMutation } = propertyApi;
