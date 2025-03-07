import { useEffect } from "react";
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
  useLocation,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// Todo: when zustand is in, add context to root
export const Route = createRootRoute({
  component: () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
