import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { PostErrorComponent } from "@/components/post-error";
import { postQuery } from "@/actions/posts";

export const Route = createFileRoute("/posts/$postId/deep")({
  loader: async ({ params: { postId }, context }) => {
    const data = await context.queryClient.ensureQueryData(postQuery(postId));

    return {
      title: data.title,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  component: PostDeepComponent,
  //preload: false,
});

function PostDeepComponent() {
  const { postId } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQuery(postId));

  return (
    <div className="p-2 space-y-2">
      <Link to="/posts" className="block py-1 text-blue-800 hover:text-blue-600">
        ← All Posts
      </Link>
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  );
}
