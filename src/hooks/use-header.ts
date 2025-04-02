import { useRouterState } from "@tanstack/react-router";

export const useHeader = () => {
  const { location } = useRouterState();

  return {
    hideHeader: location.pathname.includes("/sign-in") || location.pathname.includes("/sign-up"),
  };
};
