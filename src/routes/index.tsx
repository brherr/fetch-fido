import { useEffect, useRef } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useFidoStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { fetchDogs } from "@/lib/api/dogData";
import { useSearchDogs } from "@/hooks/dogDataHooks";
import DogCard from "@/components/DogCard";
import { SideBarWrapper } from "@/components/SideBarWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/login" });
  },
});

function Index() {
  const setFrom = useFidoStore((state) => state.setFrom);

  const shouldScrollToTop = useRef(false);

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchDogs();

  const dogIds = searchData?.resultIds ?? [];

  const {
    data: dogDetails,
    isLoading: dogsLoading,
    error: dogsError,
  } = useQuery({
    queryKey: ["fetchDogs", dogIds],
    queryFn: () => fetchDogs(dogIds),
    enabled: dogIds.length > 0,
  });

  useEffect(() => {
    if (shouldScrollToTop.current && !dogsLoading && dogDetails) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      shouldScrollToTop.current = false;
    }
  }, [dogsLoading, dogDetails]);

  const handleNextPage = () => {
    if (searchData?.next) {
      const queryParams = new URLSearchParams(searchData.next);
      const nextFrom = queryParams.get("from");
      if (nextFrom) {
        shouldScrollToTop.current = true;
        setFrom(nextFrom);
      }
    }
  };

  const handlePreviousPage = () => {
    if (searchData?.prev) {
      const queryParams = new URLSearchParams(searchData.prev);
      const prevFrom = queryParams.get("from");
      shouldScrollToTop.current = true;
      setFrom(prevFrom || "");
    }
  };

  const handleResetToFirstPage = () => {
    shouldScrollToTop.current = true;
    setFrom("");
  };

  const isLoading = searchLoading || dogsLoading;
  const isFirstPage = !searchData?.prev;

  return (
    <SideBarWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {dogDetails
          ? dogDetails.map((dog) => <DogCard key={dog.id} dog={dog} />)
          : [...Array(24)].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl bg-muted/50 animate-pulse"
              />
            ))}
      </div>

      {searchData && (
        <div className="flex justify-between items-center mt-8 w-full">
          <div className="text-sm text-muted-foreground">
            Showing {dogIds.length} of {searchData.total} dogs
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={!searchData.prev || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>

            {!isFirstPage && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetToFirstPage}
                disabled={isLoading}
              >
                First Page
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!searchData.next || isLoading}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </SideBarWrapper>
  );
}
