import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useFidoStore } from "@/lib/store";
import { Dog } from "lucide-react";
import { LoginForm } from "@/components/LoginForm";
import DogImage from "../assets/dog-fetch-login.jpg";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const resetFilters = useFidoStore((state) => state.resetFilters);
  const clearFavorites = useFidoStore((state) => state.clearFavorites);

  useEffect(() => {
    resetFilters();
    clearFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Dog className="size-4" />
            </div>
            FetchFido
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={DogImage}
          alt="dog-fetching-image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
