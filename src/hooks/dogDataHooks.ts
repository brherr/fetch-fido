import { useQuery } from "@tanstack/react-query";
import { searchDogs, fetchBreeds, DogSearchResponseT } from "@/lib/api/dogData";
import { useFidoStore } from "@/lib/store";

export const useSearchDogs = () => {
  const searchFilters = useFidoStore((state) => state.searchFilters);
  return useQuery<DogSearchResponseT, Error>({
    queryKey: ["searchDogs", searchFilters],
    queryFn: () => searchDogs(searchFilters),
  });
};

export const useFetchBreeds = () => {
  return useQuery<string[], Error>({
    queryKey: ["fetchBreeds"],
    queryFn: () => fetchBreeds(),
  });
};
