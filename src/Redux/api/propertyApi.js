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
  }),
});

export const { usePropertiesQuery } = propertyApi;
