import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/_layout/")({
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  return <div>Select a post.</div>;
}
