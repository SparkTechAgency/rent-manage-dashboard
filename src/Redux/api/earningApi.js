import { baseApi } from "../baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminRevenue: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/payment?status=paid",
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    revenueRatioByYear: builder.query({
      query: (year) => {
        return {
          url: `/payment/all-income-rasio?year=${year}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useAdminRevenueQuery, useRevenueRatioByYearQuery } = earningApi;
