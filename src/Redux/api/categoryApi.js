// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

const accessToken = localStorage.getItem("accessToken");
// console.log("accessToken admin", accessToken);

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/categories",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: (formData) => {
        console.log(formData);
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/categories/create-category",
          method: "post",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoryQuery, useCreateCategoryMutation } =
  categoryApi;
