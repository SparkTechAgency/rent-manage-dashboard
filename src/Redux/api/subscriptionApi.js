import { baseApi } from "../baseApi";

const accessToken = localStorage.getItem("accessToken");
// console.log(accessToken);

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allSubscriptionPlans: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/subscriptionsplans/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["subscription"],
    }),
    subscriptionOrders: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/purchaseSubscription/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["subscription"],
    }),
    createSubscription: builder.mutation({
      query: ({ data }) => {
        // Log the ID
        return {
          url: "/subscriptionsplans/create-plan",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          invalidatesTags: ["subscription"],
        };
      },
    }),
    editSubscription: builder.mutation({
      query: ({ id, data }) => {
        console.log("Editing subscription with ID:", id); // Log the ID
        return {
          url: `/subscriptionsplans/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          invalidatesTags: ["subscription"],
        };
      },
    }),

    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscriptionsplans/db/${id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        invalidatesTags: ["subscription"],
      }),
    }),
  }),
});

export const {
  useAllSubscriptionPlansQuery,
  useCreateSubscriptionMutation,
  useEditSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useSubscriptionOrdersQuery,
} = subscriptionApi;
