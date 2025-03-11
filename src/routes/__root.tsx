import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { UserT } from "@/lib/store";

export const Route = createRootRouteWithContext<{ user?: UserT }>()({
  component: () => {
    return (
      <>
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </>
    );
  },
});
