import { baseApi } from "../baseApi";

const accessToken = localStorage.getItem("accessToken");
// console.log(accessToken);

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/auth/change-password",
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getSettings: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/settings",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["settings"],
    }),
    addSettings: builder.mutation({
      query: (data) => ({
        url: "/settings/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        invalidatesTags: ["settings"],
      }),
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PATCH",
        body: data,
        headers: {
          // "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        invalidatesTags: ["settings"],
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} = settingsApi;
