import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchDogs } from "@/lib/api/dogData";
import { useFidoStore } from "@/lib/store";
import DogCard from "@/components/DogCard";
import { SideBarWrapper } from "@/components/SideBarWrapper";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/login" });
  },
});

function Favorites() {
  const favorites = useFidoStore((state) => state.favorites);

  const {
    data: dogDetails,
    isLoading: dogsLoading,
    error: dogsError,
  } = useQuery({
    queryKey: ["fetchDogs", favorites],
    queryFn: () => fetchDogs(favorites),
    enabled: favorites.length > 0,
  });

  return (
    <SideBarWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {dogDetails ? (
          dogDetails.map((dog) => <DogCard key={dog.id} dog={dog} />)
        ) : (
          <div className="flex flex-col h-full bg-card shadow-sm border border-slate-200 rounded-xl overflow-hidden transition duration-300 hover:shadow-md">
            <div className="p-4 flex flex-col flex-grow">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-card-foreground text-xl font-semibold">
                  You currently have no favorites
                </p>
              </div>
              <Link to="/">
                <Button
                  className="rounded-md w-full mt-6 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg active:shadow-none cursor-pointer bg-chart-5 text-white hover:bg-cyan-700 active:bg-cyan-700"
                  type="button"
                >
                  <Heart />
                  Select Favorites
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </SideBarWrapper>
  );
}
