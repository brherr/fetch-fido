import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { UserT } from "@/lib/store";

// TODO: add dotenv logic to conditionally render devtools

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
