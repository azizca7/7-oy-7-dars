import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
      transformResponse: (response) =>
        response.map((post) => ({
          ...post,
          views: Math.floor(Math.random() * 1000), 
          reactions: {
            likes: Math.floor(Math.random() * 100),
            dislikes: Math.floor(Math.random() * 50),
          }, 
        })),
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
