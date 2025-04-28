import { baseApi } from "../baseApi";

const announcementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    announcements: builder.query({
      query: () => {
        // const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/admin-announcement",
          method: "get",
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //   },
        };
      },
      providesTags: ["announcements"],
    }),
    changeAnnouncementStatus: builder.mutation({
      query: ({ announcementId, status }) => {
        console.log(
          "Changing status for announcementID:",
          announcementId,
          "to",
          status
        );
        return {
          url: `/admin-announcement/${announcementId}`,
          method: "PATCH",
          body: { status },
        };
      },
      invalidatesTags: ["announcements"],
    }),
    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: "/admin-announcement/create-announcement",
        method: "POST",
        body: data,
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
        invalidatesTags: ["announcements"],
      }),
    }),
  }),
});

export const {
  useAnnouncementsQuery,
  useChangeAnnouncementStatusMutation,
  useCreateAnnouncementMutation,
} = announcementApi;
