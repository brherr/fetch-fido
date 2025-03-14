/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { UserT } from "@/lib/store";
import AuthGuard from "@/components/AuthGuard";

// TODO: add dotenv logic to conditionally render devtools

export const Route = createRootRouteWithContext<{ user?: UserT }>()({
  component: () => {
    return (
      <>
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      </>
    );
  },
});
