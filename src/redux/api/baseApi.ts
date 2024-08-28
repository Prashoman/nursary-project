import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TProductUpdate ={
  productId?:string;
  title?:string;
  image?:string;
  categoryId?:string;
  price?:number;
  quantity?:number;
  rating?:number;
  description?:string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nusary-backend.vercel.app/api/v1" }),
  tagTypes:["Category","Product"],
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: `/category/categories`,
        method: "GET",
      }),
      providesTags:["Category"]
    }),
    addCategory: builder.mutation({
      query:(category)=>{
        // console.log("redus api category",category);
        return{
          url:`/category/categories`,
          method:"POST",
          body:category
        }
      },
      invalidatesTags:["Category"]
    }),

    updateCategory:builder.mutation({
      query:(category)=>{
        const id = category.id;
        const categoryInfo = {
          categoryName:category.categoryName
        };
        // console.log("categoryInfo id",categoryInfo,":",id);
        return{
          url:`/category/categories/${id}`,       
          method:"PUT",
          body:categoryInfo
        }
      },
      invalidatesTags:["Category"]
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["Category"]
    }),
    getProduct: builder.query({
      query: (productQuery) => {
        const searchTerm:string  = productQuery?.searchTerm || "";
        const minPrice:string = productQuery?.minPrice || "";
        const maxPrice:string = productQuery?.maxPrice || "";
        const categoryId:string = productQuery?.categoryId || "";

        return {
          url: `/product/products?searchTerm=${searchTerm}&lowPrice=${minPrice}&highPrice=${maxPrice}&categoryId=${categoryId}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/product/products/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getProductByCategory:builder.query({
      query:(categoryId)=>{
        return{
          url:`/product/products/category/${categoryId}`,
          method:"GET"
        }
      },
      providesTags:["Product"]
    }),
    addProduct:builder.mutation({
      query:(product)=>{
        return{
          url:`/product/products`,
          method:"POST",
          body:product
        }
      },
      invalidatesTags:["Product"]
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["Product"]
    }),
    productUpdate : builder.mutation({

      query:(productInfo)=>{

        const id = productInfo.productId;


        const productUp = {
          categoryId:productInfo.categoryId,
          title:productInfo.title,
          price:productInfo.price,
          quantity:productInfo.quantity,
          rating:productInfo.rating,
          image:productInfo.image,
          description:productInfo.description
        };

        console.log("productUp in redux:",productUp);	
        
        return{
          url:`/product/products/${id}`,
          method:"PATCH",
          body:productUp
        }
      },
      invalidatesTags:["Product"]
    }),
    checkOut:builder.mutation({
      query:(order)=>{
        return{
          url:`/checkouts`,
          method:"POST",
          body:order	
        }
      },
      invalidatesTags:["Product"]
    })
  }),
});

export const { useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation, useGetProductQuery, useAddProductMutation, useDeleteProductMutation, useProductUpdateMutation, useCheckOutMutation,useGetSingleProductQuery,useGetProductByCategoryQuery } = baseApi;
