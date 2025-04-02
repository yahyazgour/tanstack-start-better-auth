import { useSession } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useHeader } from "@/hooks/use-header";
import { useInvalidate } from "@/hooks/use-invalidate";
import { authClient } from "@/lib/auth/client";
import { Link, useRouter } from "@tanstack/react-router";
import { Suspense } from "react";
import { toast } from "sonner";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const { hideHeader } = useHeader();

  if (hideHeader) return;

  return (
    <div className="p-2 flex gap-2 text-lg">
      <Link
        to="/"
        activeProps={{
          className: "font-bold",
        }}
        activeOptions={{ exact: false }}
      >
        Home
      </Link>{" "}
      <Link
        to="/posts"
        activeProps={{
          className: "font-bold",
        }}
      >
        Posts
      </Link>{" "}
      <Link
        // @ts-expect-error
        to="/this-route-does-not-exist"
        activeProps={{
          className: "font-bold",
        }}
      >
        This Route Does Not Exist
      </Link>
      <ModeToggle />
      <Suspense fallback={<div>Loading User</div>}>
        <UserControl />
      </Suspense>
    </div>
  );
};

export default Header;

const UserControl = () => {
  const { data: session } = useSession();
  const { invalidateSession } = useInvalidate();
  const { invalidate: invalidateRouter } = useRouter();

  //const { invalidateSession } = useRouteContext({ from: "__root__" });
  //const { data: session2, isPending } = authClient.useSession();
  //const { session } = useLoaderData({ from: "__root__" });
  //const navigate = useNavigate();
  //const router = useRouter();
  //const request = getWebRequest();
  //const routeApi = getRouteApi('/posts')
  //const { location } = useRouterState();

  const signOut = async () => {
    const { data, error } = await authClient.signOut(
      {},
      {
        onRequest: () => {},
        onResponse: () => {},
        onSuccess: () => {
          toast("Signed out successfully");
          invalidateSession();
          invalidateRouter();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <>
      {/* {isSessionFetching ? <div>is pending working !!</div> : <div></div>} */}
      {session ? (
        <>
          {session.user.email}
          <Button onClick={signOut}>Sign Out</Button>
        </>
      ) : (
        <Link to="/sign-in">Sign In</Link>
      )}
    </>
  );
};
