import { useEffect } from "react";
import { useFidoStore } from "@/lib/store";
import { useNavigate } from "@tanstack/react-router";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useFidoStore((state) => state.user);
  const hasHydrated = useFidoStore((state) => state._hasHydrated);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasHydrated) {
      if (location.pathname.includes("/login") && user) {
        navigate({ to: "/" });
      }

      // If on protected route and no user, redirect to login
      const protectedRoutes = ["/favorites", "/match", "/"];
      const isProtectedRoute = protectedRoutes.some((route) =>
        location.pathname.endsWith(route)
      );

      if (isProtectedRoute && !user) {
        navigate({ to: "/login" });
      }
    }
  }, [hasHydrated, user, navigate]);

  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default AuthGuard;
