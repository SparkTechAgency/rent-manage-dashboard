import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/orders",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: `/orders/status/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["updateOrder"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } = orderApi;
