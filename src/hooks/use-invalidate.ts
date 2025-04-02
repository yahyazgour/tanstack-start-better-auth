import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useInvalidate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return {
    invalidateSession: () => queryClient.invalidateQueries({ queryKey: ["session"] }),

    invalidateAuth: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await router.invalidate();
    },
  };
};
