import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "redaxios";

export type PostType = {
  id: string;
  title: string;
  body: string;
};

const fetchPosts = createServerFn({ method: "GET" }).handler(async () => {
  return axios
    .get<Array<PostType>>("https://jsonplaceholder.typicode.com/posts")
    .then((r) => r.data.slice(0, 10));
});

export const postsQuery = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

const fetchPost = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    const post = await axios
      .get<PostType>(`https://jsonplaceholder.typicode.com/posts/${data}`)
      .then((r) => r.data)
      .catch((err) => {
        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });

    return post;
  });

export const postQuery = (postId: string) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: () => fetchPost({ data: postId }),
  });

/**
 * This file contains an example minimal service for Posts.
 */

// import { DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";
// import { createServerFn } from "@tanstack/start";
// import { z } from "zod";

// import prisma from '@/db';
// import {
//   queryOptions,
// } from '@tanstack/react-query';
// import { createServerFn } from '@tanstack/start';

// const getPosts = createServerFn('GET', async () => {
//   const all = await prisma.post.findMany();

//   return all;
// });

// const createPost = createServerFn("POST", async (data: z.infer<typeof createPostSchema>) => {
//   return prisma.post.create({
//     data: {
//       content: data.content,
//       author: {
//         connect: {
//           id: data.author
//         }
//       }
//     }
//   })
// });

// const postQueries = {
//   getAll: () =>
//     queryOptions({
//       queryKey: ['posts', 'all'],
//       queryFn: () => getPosts(),
//     }),
// } as const;

// const createPostSchema = z.object({
//   content: z.string(),
//   author: z.number(),
// });

// const useCreatePostMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation<Post, DefaultError, z.infer<typeof createPostSchema>>({
//     mutationFn: createPost,
//     onMutate: async () => {
//       await queryClient.cancelQueries({ queryKey: ['posts'] });
//       await queryClient.invalidateQueries({ queryKey: ['posts', 'all'] });
//     }
//   })
// }

// const postSchemas = {
//   createPost: createPostSchema,
// } as const;

// export { postQueries, postSchemas, useCreatePostMutation };
