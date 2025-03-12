import { useState, useEffect } from "react";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchDogs, fetchMatch } from "@/lib/api/dogData";
import { useFidoStore } from "@/lib/store";
import DogCard from "@/components/DogCard";
import { SideBarWrapper } from "@/components/SideBarWrapper";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/match")({
  component: Match,
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/login" });
  },
});

function Match() {
  const [currentMatchId, setCurrentMatchId] = useState<string | null>(null);
  const [shouldFetchMatch, setShouldFetchMatch] = useState(true);

  const favorites = useFidoStore((state) => state.favorites);

  useEffect(() => {
    if (currentMatchId && !favorites.includes(currentMatchId)) {
      setCurrentMatchId(null);
      setShouldFetchMatch(true);
    }
  }, [favorites, currentMatchId]);

  const {
    data: matchDetails,
    isLoading: matchLoading,
    error: matchError,
    refetch: refetchMatch,
  } = useQuery({
    queryKey: ["fetchMatch", favorites],
    queryFn: () => fetchMatch(favorites),
    enabled: favorites.length > 0 && shouldFetchMatch,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (matchDetails?.match && !currentMatchId) {
      setCurrentMatchId(matchDetails.match);
      setShouldFetchMatch(false);
    }
  }, [matchDetails, currentMatchId]);

  const {
    data: dogDetails,
    isLoading: dogsLoading,
    error: dogsError,
  } = useQuery({
    queryKey: ["fetchDogs", matchDetails?.match],
    queryFn: () => {
      const matchId = currentMatchId || matchDetails?.match;
      return matchId ? fetchDogs([matchId]) : Promise.resolve([]);
    },
    enabled: !!(currentMatchId || matchDetails?.match),
    staleTime: Infinity,
  });

  const handleGenerateMatch = () => {
    setShouldFetchMatch(true);
    setCurrentMatchId(null);
    refetchMatch();
  };

  useEffect(() => {
    if (dogsError) {
      toast.error("Failed to load dogs", {
        description: "Please try again or check your connection",
      });
    }
    if (matchError) {
      toast.error("Failed to load match data", {
        description: "Please try again",
      });
    }
  }, [dogsError, matchError]);

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
            <div className="mt-6 flex justify-center gap-2">
              <Button
                className="rounded-md py-2 px-4 border border-transparent text-sm text-white shadow-md hover:shadow-lg bg-amber-500 hover:bg-amber-600 cursor-pointer"
                type="button"
                onClick={handleGenerateMatch}
              >
                New Match
              </Button>
              <Link to="/">
                <Button
                  className="rounded-md py-2 px-4 border border-transparent text-sm text-white shadow-md hover:shadow-lg bg-chart-5 hover:bg-cyan-700 cursor-pointer"
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
                  className="rounded-md w-full py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg active:shadow-none cursor-pointer bg-chart-5 text-white hover:bg-cyan-700 active:bg-cyan-700"
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
