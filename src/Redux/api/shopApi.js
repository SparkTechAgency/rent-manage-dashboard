// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("accessToken");

// const accessToken = localStorage.getItem('accessToken');
// console.log('accessToken admin', accessToken);

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUniqueProducts: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/product-info/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["category"],
    }),

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
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (formData) => {
        console.log(formData);
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: "/product-info/add-products",
          method: "POST",
          body: formData,
          headers: {
            // "Content-type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["products"],
    }),
    editProduct: builder.mutation({
      query: ({ id, data }) => {
        console.log(data);
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        if (!accessToken) {
          console.error("Access token not found.");
        }
        return {
          url: `/product-info/${id}`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetUniqueProductsQuery,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
} = shopApi;
