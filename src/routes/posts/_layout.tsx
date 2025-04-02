import { postsQuery } from "@/actions/posts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/_layout")({
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(postsQuery());
  },
  head: () => ({
    meta: [{ title: "Posts" }],
  }),
  component: PostsComponent,
});

function PostsComponent() {
  const { data: posts } = useSuspenseQuery(postsQuery());

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[...posts, { id: "i-do-not-exist", title: "Non-existent Post" }].map((post) => {
          return (
            <li key={post.id} className="whitespace-nowrap">
              <Link
                to="/posts/$postId"
                //preload={false}
                params={{
                  postId: post.id,
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: "text-black font-bold" }}
              >
                <div>{post.title.substring(0, 20)}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
