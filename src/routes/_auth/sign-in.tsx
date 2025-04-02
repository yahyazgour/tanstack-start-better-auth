import SignInForm from "@/components/auth/sign-in-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignInForm />;
}
