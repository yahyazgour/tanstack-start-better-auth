import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { DefaultCatchBoundary } from "./components/default-catch-boundary";
import { NotFound } from "./components/not-found";
import { routeTree } from "./routeTree.gen";

// NOTE: Most of the integration code found here is experimental and will
// definitely end up in a more streamlined API in the future. This is just
// to show what's possible with the current APIs.

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        //staleTime: 5 * 60 * 1000,
        //refetchOnWindowFocus: true,
        //refetchOnReconnect: true,
      },
    },
  });

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: {
        queryClient,
      },
      defaultPreload: "intent",
      //defaultStaleTime: Infinity,
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
    }),
    queryClient
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

/* const [optimisticUser, updateOptimisticUser] = useOptimistic(
  query.data?.user,
  (state, newData: Partial<User>) => ({
    ...state,
    ...newData
  })
);

// Usage example
const updateUser = async (newData: Partial<User>) => {
  updateOptimisticUser(newData);
  await updateUserAPI(newData);
  query.refetch();
}; */
