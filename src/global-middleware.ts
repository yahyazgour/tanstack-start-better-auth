// app/global-middleware.ts
import { redirect, useRouterState } from "@tanstack/react-router";
import { createMiddleware, registerGlobalMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/"];

const redirectMiddleware = createMiddleware().server(async ({ next, context }) => {
  //console.log(context.); // <-- This will not be typed!
  const {
    location: { pathname, search },
  } = useRouterState();

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  const request = getWebRequest()!;
  const sessionToken = getSessionCookie(request.headers);

  if (sessionToken && isAuthRoute) throw redirect({ to: "/" });

  if (!sessionToken && isProtectedRoute) {
    let callbackUrl = pathname;
    if (search) callbackUrl += search;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    throw redirect({ to: "/sign-in", params: { callbackUrl: encodedCallbackUrl } });
  }

  return next();
});

/* registerGlobalMiddleware({
  middleware: [redirectMiddleware],
}); */

const loggingMiddleware = createMiddleware().server(async ({ next }) => {
  console.log("Request received");
  return await next();
});
