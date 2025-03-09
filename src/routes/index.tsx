import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchDogs } from "@/lib/api/dogData";
import { useSearchDogs } from "@/hooks/dogDataHooks";
import DogCard from "@/components/dogCard";
import { SideBarWrapper } from "@/components/SideBarWrapper";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/login" });
  },
});

function Index() {
  const searchParams = {
    // size: 10,
    sort: "breed:asc",
  };

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchDogs(searchParams);

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

  return (
    <SideBarWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {dogDetails
          ? dogDetails.map((dog) => <DogCard key={dog.id} dog={dog} />)
          : [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl bg-muted/50 animate-pulse"
              />
            ))}
      </div>
    </SideBarWrapper>
  );
}
