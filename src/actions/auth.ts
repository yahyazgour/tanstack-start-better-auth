import { auth } from "@/lib/auth";
import { type QueryClient, queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

const getSession = createServerFn({ method: "GET" }).handler(async () => {
  // delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { headers } = getWebRequest()!;
  const session = await auth.api.getSession({ headers });
  return session;
});

export const sessionQuery = () => {
  return queryOptions({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });
};

export const prefetchSession = ({ queryClient }: { queryClient: QueryClient }) => {
  return queryClient.prefetchQuery(sessionQuery());
};

export const useSession = () => useSuspenseQuery(sessionQuery()); // !! seperate session into session.ts wthin auth folder within actions
