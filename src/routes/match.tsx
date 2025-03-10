import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchDogs, fetchMatch } from "@/lib/api/dogData";
import { useFidoStore } from "@/lib/store";
import DogCard from "@/components/DogCard";
import { SideBarWrapper } from "@/components/SideBarWrapper";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/match")({
  component: Match,
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/login" });
  },
});

function Match() {
  const favorites = useFidoStore((state) => state.favorites);

  const {
    data: matchDetails,
    isLoading: matchLoading,
    error: matchError,
  } = useQuery({
    queryKey: ["fetchMatch", favorites],
    queryFn: () => fetchMatch(favorites),
    enabled: favorites.length > 0,
  });

  const {
    data: dogDetails,
    isLoading: dogsLoading,
    error: dogsError,
  } = useQuery({
    queryKey: ["fetchDogs", matchDetails?.match],
    queryFn: () =>
      matchDetails?.match
        ? fetchDogs([matchDetails?.match])
        : Promise.resolve([]),
    enabled: !!matchDetails?.match,
  });
  console.log("🚀 ~ Match ~ dogDetails:", dogDetails);

  return (
    <SideBarWrapper>
      <div className="flex justify-center items-center h-full w-full">
        {dogsLoading || matchLoading ? (
          <div className="text-center p-8">Loading your perfect match...</div>
        ) : dogDetails && dogDetails.length > 0 ? (
          <div className="max-w-md w-full">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary">
                Your Perfect Match!
              </h2>
              <p className="text-muted-foreground">
                We found the perfect dog for you
              </p>
            </div>
            <DogCard key={dogDetails[0].id} dog={dogDetails[0]} />
            <div className="mt-6 flex justify-center">
              <Link to="/">
                <Button
                  className="rounded-md py-2 px-4 border border-transparent text-sm text-white shadow-md hover:shadow-lg bg-chart-5 hover:bg-cyan-700"
                  type="button"
                >
                  Find More Dogs
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-md w-full bg-card shadow-sm border border-slate-200 rounded-xl overflow-hidden transition duration-300 hover:shadow-md p-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-primary">
                No Match Found
              </h2>
              <p className="text-muted-foreground mt-2">
                You need to have favorites to find a match
              </p>
            </div>
            <div className="p-4 flex flex-col items-center">
              <p className="text-card-foreground text-lg mb-4 text-center">
                Select some favorite dogs to get matched with your perfect
                companion!
              </p>
              <Link to="/">
                <Button
                  className="rounded-md w-full py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg active:shadow-none cursor-pointer bg-chart-5 text-white hover:bg-cyan-700 active:bg-cyan-700"
                  type="button"
                >
                  <Heart className="mr-2" />
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
