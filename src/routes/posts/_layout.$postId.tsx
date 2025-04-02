import { postQuery } from "@/actions/posts";
import { NotFound } from "@/components/not-found";
import { PostErrorComponent } from "@/components/post-error";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/_layout/$postId")({
  loader: async ({ params: { postId }, context }) => {
    const data = await context.queryClient.ensureQueryData(postQuery(postId));

    return {
      title: data.title,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  component: PostComponent,
  pendingComponent: PendingComponent,
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
  //preload: false,
});

function PostComponent() {
  const { postId } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQuery(postId));

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
      <Link
        to="/posts/$postId/deep"
        params={{
          postId: post.id,
        }}
        activeProps={{ className: "text-black font-bold" }}
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        Deep View
      </Link>
    </div>
  );
}

function PendingComponent() {
  return <div>Pending Component</div>;
}
