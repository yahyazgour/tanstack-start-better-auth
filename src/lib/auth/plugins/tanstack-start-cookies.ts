import { setCookie } from "@tanstack/react-start/server";
import type { BetterAuthPlugin } from "better-auth";
import { parseSetCookieHeader } from "better-auth/cookies";
import { createAuthMiddleware } from "better-auth/plugins";

export const tanstackStartCookies = () =>
  ({
    id: "tanstack-start-cookies",
    hooks: {
      after: [
        {
          matcher: () => true,
          handler: createAuthMiddleware(async (ctx) => {
            // Skip if this is a router context
            if ("_flag" in ctx && ctx._flag === "router") return;

            const { responseHeaders } = ctx.context;

            // Only proceed if we have Headers instance
            if (!(responseHeaders instanceof Headers)) return;

            const setCookieHeader = responseHeaders.get("set-cookie");
            if (!setCookieHeader) return;

            const cookies = parseSetCookieHeader(setCookieHeader);

            // Process each cookie
            cookies.forEach((cookieData, cookieName) => {
              if (!cookieName) return;

              try {
                setCookie(cookieName, decodeURIComponent(cookieData.value), {
                  sameSite: cookieData.samesite,
                  secure: cookieData.secure,
                  maxAge: cookieData["max-age"],
                  httpOnly: cookieData.httponly,
                  partitioned: cookieData.partitioned,
                  domain: cookieData.domain,
                  path: cookieData.path,
                });
              } catch (error) {
                // Consider logging the error or handling it more explicitly
                // console.error(`Failed to set cookie ${cookieName}:`, e);
              }
            });
          }),
        },
      ],
    },
  }) satisfies BetterAuthPlugin;
